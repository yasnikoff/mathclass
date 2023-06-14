FROM node:19-alpine
WORKDIR ./app
ENV PATH ./app/node_modules/.bin:$PATH
COPY ["app/back/package.json", "./app/back/"]
COPY ["package-lock.json", "package.json", "./"]
COPY ["app/front/build", "./app/front/build"]
COPY ["app/front/package.json", "./app/front/"]
RUN npm i
COPY ./app/front ./app/front
COPY ./app/back ./app/back
WORKDIR ./app/front
RUN npm run build
WORKDIR ../back
RUN npm run build
EXPOSE 80
ENTRYPOINT ["npm", "run", "start:prod"]