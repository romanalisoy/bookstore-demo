FROM node:18-alpine
LABEL authors="Eldar Muzaffarov"
WORKDIR /usr/app
COPY package.json .
RUN npm install --legacy-peer-deps
RUN npm install -g pm2
COPY . .
RUN npm run build
RUN mv .env.example .env &&  cp .env dist/.env
EXPOSE 3000
CMD npm run migration:production && pm2-runtime 'npm start'