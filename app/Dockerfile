# Stage 1: Build the Angular application
FROM node:14 as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve the Angular application using Nginx
FROM nginx:alpine

COPY --from=build /app/dist/app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#run this
#docker build -t angular-app . "to build the app image"
#docker run -d -p 4200:80 angular-app "to run the docker container"