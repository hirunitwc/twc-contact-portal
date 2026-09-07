FROM node:20-alpine

WORKDIR /app

# Install OpenSSL - required for Prisma's engine binaries to run on Alpine
RUN apk add --no-cache openssl

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy Prisma schema before generating client
COPY prisma ./prisma
RUN npx prisma generate

# Copy the rest of the source
COPY . .

# Build the Nest app
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node dist/main.js"]