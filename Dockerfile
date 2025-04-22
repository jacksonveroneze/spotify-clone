FROM node:22.14-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.27-alpine-slim
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/spotify-clone/browser/ /usr/share/nginx/html