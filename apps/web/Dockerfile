# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci

ARG API_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}

COPY . .
RUN npm run build

# Production Stage (nginx)
FROM nginx:stable-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf ./*

# Copia arquivos necessários do build
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./_next/static

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
