FROM node:20-alpine
WORKDIR /app

COPY package.json ./
RUN npm install --omit=dev --no-audit --no-fund

COPY src ./src

EXPOSE 3000
HEALTHCHECK --interval=5s --timeout=3s --retries=10 --start-period=3s \
  CMD wget -qO- http://localhost:3000/api/health > /dev/null 2>&1 || exit 1

CMD ["node", "src/server.js"]
