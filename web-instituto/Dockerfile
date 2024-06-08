
# Etapa 1: Construcción
# Utiliza una imagen oficial de Node.js como base para la construcción
FROM node:16 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación de React
RUN npm run build

# Etapa 2: Servidor web
# Utiliza una imagen de Nginx para servir los archivos estáticos de la aplicación de React
FROM nginx:alpine

# Copia los archivos compilados de la etapa anterior al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expon el puerto en el que Nginx estará sirviendo la aplicación
EXPOSE 80

# Comando por defecto para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
