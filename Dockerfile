# # build stage
# FROM node:21-alpine AS build

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# # production stage
# FROM node:21-alpine

# WORKDIR /app

# COPY --from=build /app/dist ./dist

# EXPOSE 3000

# CMD [ "node", "dist/main.js" ]

# FROM node:21-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "start:dev" ]