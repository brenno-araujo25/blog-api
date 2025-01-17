# BUILD STAGE
FROM node:21.7.1 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# build the NestJS application
RUN npm run build

# RUN STAGE
FROM node:21.7.1

WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]