FROM node:18-alpine

WORKDIR /app
# grab [ package.json, package-lock.json, tsconfig.json ]
COPY ./package.json .
COPY ./package-lock.json .
COPY ./tsconfig.json .

RUN npm install

COPY ./src ./src

RUN ./node_modules/.bin/tsc

COPY ./views ./dist/views
COPY ./public ./dist/public
COPY ./healthcheck.js /healthcheck.js

HEALTHCHECK --interval=120s --timeout=4s CMD node /healthcheck.js 

EXPOSE 3000

CMD ["node", "./dist/server/server.js"]