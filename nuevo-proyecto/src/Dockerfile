
# Etapa de compilacion
FROM node:18.17.1 AS dev-deps

WORKDIR /app

COPY package.json package.json

RUN npm install


# Etapa 2
FROM node:18.17.1 AS builder

WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY . .

RUN npm run build


# Etapa de produccion
FROM nginx:1.23.3 as prod

# Puerto
EXPOSE 85

COPY --from=builder /app/dist/app-web/browser/ /usr/share/nginx/html

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]