# todo: compiule time
FROM node:12-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install -D && npm run build:prod

# todo: run time
FROM nginx:alpine
COPY devops/nginx/default.conf /etc/nginx/conf.d/
COPY --from=builder /app/public/ /usr/share/nginx/html/
