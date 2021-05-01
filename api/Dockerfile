FROM node:14

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn install
#RUN yarn typeorm migration:run

COPY . .

CMD ["yarn", "start"]