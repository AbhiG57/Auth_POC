#stage 1
FROM node:22.0.0 AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

#stage 2
FROM nginx:alpine

EXPOSE 8000
COPY --from=node /app/dist/slm-poc-ui/browser/* /usr/share/nginx/html/
COPY --from=node /app/nginx.conf /etc/nginx/nginx.conf
