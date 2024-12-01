FROM node:20.0


# Copy package.json and package-lock.json
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy application source code
COPY . .

EXPOSE 5000

CMD ["npx", "nodemon", "src/server.ts"]