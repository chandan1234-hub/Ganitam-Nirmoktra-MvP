FROM node:24.22.1-slim AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:8000/
ARG VITE_AI_ENDPOINT=api/solver/solve
ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_EMAILJS_PUBLIC_KEY
ARG VITE_EMAILJS_SERVICE_KEY
ARG VITE_EMAILJS_TEMPLATE_KEY

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24.22.1-slim

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build --chown=node:node /app/package*.json ./
COPY --from=build --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
