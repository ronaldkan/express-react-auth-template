FROM mhart/alpine-node

WORKDIR /src

COPY package.json .
RUN npm i

COPY . .

EXPOSE 5000

CMD ["npm", "start"]