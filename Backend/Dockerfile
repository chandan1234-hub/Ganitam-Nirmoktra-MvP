FROM node:24.22.1-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

RUN mkdir -p /app/public/temp && chown -R node:node /app/public
COPY --chown=node:node src ./src


USER node
EXPOSE 8000

CMD ["npm", "start"]
