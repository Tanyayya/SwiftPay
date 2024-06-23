# Use a specific Node.js Alpine version
FROM node:20.12.0-alpine3.19

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy apps and packages directories
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Add a script to the global package.json to run Prisma generate
RUN echo "cd packages/db && npx prisma generate && cd ../../" >> /usr/src/app/package.json

# Set the default working directory for the app
WORKDIR /usr/src/app/apps/user-app

# CMD instruction defines the default command to run when the container starts
CMD ["npm", "run", "start-user-app"]
