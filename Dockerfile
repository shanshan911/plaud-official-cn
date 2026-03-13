# Stage 1: Build
FROM 470515048733.dkr.ecr.cn-northwest-1.amazonaws.com.cn/public/library/node:20-slim AS builder
WORKDIR /app

RUN npm install -g pnpm --registry=https://registry.npmmirror.com

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --registry=https://registry.npmmirror.com

COPY . .
RUN pnpm run build

# Stage 2: Serve
FROM 470515048733.dkr.ecr.cn-northwest-1.amazonaws.com.cn/public/library/nginx:1.25-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
