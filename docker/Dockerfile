FROM node:16.14.0-alpine as builder

ENV NODE_ENV development

COPY . /app
WORKDIR /app

RUN npm ci --quiet
RUN npm run build
RUN npm ci --only=production

RUN ls -al /app/dist

FROM node:16.14.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules

CMD [ "node", "/app/main.js" ]

EXPOSE 3000
