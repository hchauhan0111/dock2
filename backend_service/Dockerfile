# Use Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port (should match your server PORT)
EXPOSE 5000

# Start the backend service
CMD ["node", "index.js"]
