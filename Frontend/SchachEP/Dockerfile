FROM node:16 as Build
LABEL authors="BoyanLu"

WORKDIR /usr/src/app

COPY . .

RUN npm install -g @angular/cli
RUN npm ci
RUN npm install --save-dev start-server-and-test
RUN npm install --save-dev angular-http-server

RUN npm run build

CMD ["npx", "angular-http-server", "--path", "./dist/schach-ep", "-p", "4200"]
EXPOSE 4200
