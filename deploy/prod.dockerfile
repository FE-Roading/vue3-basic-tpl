FROM xx-web-base:latest as base

# 开启构建工作
WORKDIR /app
ADD . ./
RUN npm run build:prod

# nginx服务构建
FROM nginx:1.18 as server

# 复制构建文件和配置
RUN mkdir -p /usr/share/nginx/html/dist
COPY --from=base /app/dist /usr/share/nginx/html/dist
COPY ./deploy/nginx.conf /etc/nginx/

# 运行服务
EXPOSE 80
