#1. Imagen base
FROM node:22.11.0

# 2. Directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiar los archivos necesarios
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código
COPY . .

# 6. Exponer el puerto en el que corre tu servidor
EXPOSE 8080

# 7. Comando para correr tu app
CMD ["npm", "start"]
