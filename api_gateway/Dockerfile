# Use official Node.js image
FROM node:18-alpine  
 
# Set the working directory
WORKDIR /app  
 
# Copy package.json and package-lock.json
COPY package*.json ./  
 
# Install dependencies
RUN npm install  
 
# Copy the rest of the application files
COPY . .  
 
# Expose the port your gateway runs on (e.g., 3000)
EXPOSE 3000  
 
# Start the application
CMD ["node", "gateway.js"]
