FROM node:21

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3333

CMD ["npx", "nodemon", "--exec", "ts-node", "src/index.ts"]