# Utilisez une image Node.js officielle en tant qu'image de base
FROM node:16

# Définissez le répertoire de travail dans le conteneur
WORKDIR /home/hneut/iziplan/api/api/src

# Copiez les fichiers de votre projet dans le conteneur
COPY . .

# Installez les dépendances
RUN npm install

# Installez PM2 globalement
RUN npm install pm2 -g
RUN npm install @nestjs/swagger
# Exposez le port sur lequel votre application écoute
EXPOSE 64000

# Commande pour démarrer l'application en utilisant PM2
CMD ["pm2-runtime", "start", "npm", "--", "start"]
