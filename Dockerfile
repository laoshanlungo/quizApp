FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY node-postgres/ ./node-postgres

CMD [ "node", "node-postgres/index.js" ]