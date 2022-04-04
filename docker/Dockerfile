FROM node:16.14.0-alpine as builder

ENV NODE_ENV development
RUN apk add --no-cache curl

WORKDIR /app
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" && \ 
    chmod +x kubectl && \
    curl -LO "https://dl.k8s.io/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl.sha256" && \
    echo "$(cat kubectl.sha256)  kubectl" | sha256sum -c


COPY . /app

RUN npm ci --quiet
RUN npm run build
RUN npm ci --only=production

RUN ls -al /app/dist

FROM node:16.14.0-alpine

ENV NODE_ENV production

WORKDIR /app
COPY --from=builder /app/dist /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/kubectl /usr/local/bin/kubectl

CMD [ "node", "/app/main.js" ]

EXPOSE 3000
