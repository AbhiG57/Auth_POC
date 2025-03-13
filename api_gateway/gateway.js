require('dotenv').config();
const express = require('express');
const session = require('express-session');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
 
const app = express();
const PORT = process.env.PORT || 3000;
 
// Keycloak Config
const KEYCLOAK_BASE_URL = process.env.KEYCLOAK_BASE_URL;
const KEYCLOAK_SERVICE_URL = process.env.KEYCLOAK_SERVICE_URL;
const REALM = process.env.REALM;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
 
// Frontend & Backend
const UI_URL = process.env.UI_URL;
const BACKEND_URL = process.env.BACKEND_URL;
 
// Session Setup
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
 
// Function to check if token is valid
function isTokenValid(req) {
    return req.session.token && req.session.expiry && Date.now() < req.session.expiry;
}
// Refresh Token
async function refreshToken(req) {
    if (!req.session.refresh_token) {
        console.log("No refresh token available.");
        return false;
    }
    try {
const response = await axios.post(`${process.env.KEYCLOAK_SERVICE_URL}/realms/${process.env.REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: req.session.refresh_token
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
 
        req.session.token = response.data.access_token;
        req.session.expiry = Date.now() + response.data.expires_in * 1000;
        req.session.refresh_token = response.data.refresh_token;
        console.log("Token refreshed successfully.");
        return true;
    } catch (error) {
        console.error("Error refreshing token:", error.response?.data || error.message);
        return false;
    }
}
 
// Middleware: Redirect UI requests but NOT API requests
app.use((req, res, next) => {
    /* if (req.path.startsWith('/api/backend')) {
        if (!isTokenValid(req)) {
            console.log("API request but token invalid, returning 401");
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return next();
    }*/
 
    if (req.path === '/callback') {
        return next();
    }
    if(req.path == '/')
    {
        return res.redirect('/ui');
    }
 
    // Check if token is expired
    if (!isTokenValid(req)) {
        console.log("Token expired, attempting refresh...");
 
        refreshToken(req)
            .then((refreshed) => {
                if (!refreshed) {
                    console.log("Redirecting to Keycloak for authentication...");
                    req.session.redirectAfterLogin = req.originalUrl;
                    return res.redirect(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/auth?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALLBACK_URL}`);
                }
                next(); // Continue after successful refresh
            })
            .catch((err) => {
                console.error("Error refreshing token:", err);
                return res.redirect(`${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.REALM}/protocol/openid-connect/auth?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.CALLBACK_URL}`);
            });
    } else {
        next(); // Continue if token is valid
    }
    
});
 
 
// Handle Keycloak OAuth2 callback
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) {
        return res.status(400).send('Authorization code is missing');
    }
 
    try {
        // Exchange authorization code for tokens
        const tokenResponse = await axios.post(
            `${KEYCLOAK_SERVICE_URL}/realms/${REALM}/protocol/openid-connect/token`,
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: CALLBACK_URL
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
 
        req.session.token = tokenResponse.data.access_token;
        req.session.refresh_token = tokenResponse.data.refresh_token;
        req.session.expiry = Date.now() + tokenResponse.data.expires_in * 1000;
 
        console.log('User authenticated successfully. Redirecting to UI.');
        const redirectUrl = req.session.redirectAfterLogin;
        delete req.session.redirectAfterLogin;
        console.log("redirect URl",redirectUrl);
        return res.redirect(redirectUrl);
    } catch (error) {
        console.error('Token exchange failed:', error.response?.data || error.message);
        return res.status(500).send('Authentication failed');
    }
});
 
// Proxy API requests to backend
app.use('/api/backend', createProxyMiddleware({
    target: process.env.BACKEND_URL, // Ensure this is set correctly
    changeOrigin: true,
    pathRewrite: { '^/api/backend': '' }, // Remove prefix if needed
    onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request: ${req.method} ${req.originalUrl} -> ${process.env.BACKEND_URL}`);
    },
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        res.status(500).json({ error: 'Proxy Error', details: err.message });
    }
}));


// Proxy requests to UI (Angular app)
app.use('/ui', createProxyMiddleware({
    target: UI_URL,
    changeOrigin: true
}));
 
// Start the API Gateway
app.listen(PORT, () => {
    console.log(`API Gateway running at http://localhost:${PORT}`);
});
 