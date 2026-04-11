# Usa una imagen oficial de Node.js 12-alpine
FROM node:12-alpine AS builder

WORKDIR /usr/src/app

# Copia solo los archivos de dependencias primero para aprovechar el cache
COPY package*.json ./

# Instala solo dependencias de producción
RUN npm ci
#RUN npm ci --only=production

# Copia el resto del código fuente
COPY . .

# Usa una imagen más limpia para producción
FROM node:12-alpine

WORKDIR /usr/src/app

# Copia solo los archivos necesarios desde la etapa anterior
COPY --from=builder /usr/src/app ./

# Usa un usuario no root por seguridad
RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
    && mkdir -p /usr/src/app/dist \
    && chown -R appuser:appgroup /usr/src/app

EXPOSE 3000

CMD ["npm", "run", "start:prod"]