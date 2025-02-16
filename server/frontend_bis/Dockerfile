FROM nginx:alpine

# Copier les fichiers frontend dans le conteneur
COPY Findcar.html /usr/share/nginx/html/index.html
COPY script.js /usr/share/nginx/html/script.js
COPY style.css /usr/share/nginx/html/style.css

# Exposer le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]