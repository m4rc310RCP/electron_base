FROM node:latest as builder

WORKDIR /app
COPY package*.json ./
RUN npm i

COPY . .

RUN npm run build 
#-------
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
EXPOSE 8080
