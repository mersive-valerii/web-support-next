# Use an official Node runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Next.js collects telemetry data by default. The following line opts out of telemetry collection; remove it if you prefer to leave telemetry enabled.
ENV NEXT_TELEMETRY_DISABLED 1

# Build your Next.js app
RUN npm run build

# Your app binds to port 3000. Expose this port in your Dockerfile.
EXPOSE 8089

# Define the runtime command to start your app
CMD ["npm", "start"]
