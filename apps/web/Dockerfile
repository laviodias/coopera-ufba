# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_MAX_WORKERS=2

COPY package*.json ./
RUN npm ci

ARG API_URL
ENV NEXT_PUBLIC_API_URL=${API_URL}

COPY . .
RUN npm run build

# Production Stage
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"] # Ou o comando para iniciar seu servidor Next.js