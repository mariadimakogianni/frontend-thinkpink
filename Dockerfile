# Use Node for building the Vue app
FROM node:16-slim as build-stage

# working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files and build
COPY . .
RUN npm run build

# Use Nginx to serve the application with HTTPS
FROM nginx:stable-alpine as production-stage

# Set up SSL certificates 
COPY ./ssl/server.crt /etc/nginx/ssl/server.crt
COPY ./ssl/server.key /etc/nginx/ssl/server.key

# Copy built files to Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Set up Nginx configuration inline to serve via HTTPS
RUN echo 'server { \
    listen 8080 ssl; \
    server_name localhost; \
    \
    ssl_certificate /etc/nginx/ssl/server.crt; \
    ssl_certificate_key /etc/nginx/ssl/server.key; \
    \
    ssl_protocols TLSv1.2 TLSv1.3; \
    ssl_prefer_server_ciphers on; \
    \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port 8080 for HTTPS
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
