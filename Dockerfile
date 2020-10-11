FROM node:14-alpine

WORKDIR /app

ADD ./next-fron/package.json .
ADD ./next-fron/package-lock.json .
RUN npm install

WORKDIR /fron
ADD fron/package.json .
ADD fron/package-lock.json .
RUN npm install

ADD fron/ .
RUN npm run build
RUN mkdir /app/public
RUN mv build /app/public/v1

WORKDIR /app
ADD /next-fron .
RUN yarn build
ENTRYPOINT ./node_modules/.bin/next start -H 0.0.0.0 -p 3000
EXPOSE 3000/tcp
