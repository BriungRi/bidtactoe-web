FROM node
ADD . /web
WORKDIR /web
RUN npm install
CMD [ "npm", "start" ]