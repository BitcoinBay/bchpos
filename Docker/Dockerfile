FROM node:8.9
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD npm start