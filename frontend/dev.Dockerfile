# Use a base image for Node.js
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

COPY package.json .

# Install dependencies
RUN npm install

# Copy the entire app directory to the container
COPY . .

# Start the Vite development server
CMD ["npm", "run", "dev"]