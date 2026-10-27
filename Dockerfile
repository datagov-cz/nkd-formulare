FROM node:26.12.1

WORKDIR /opt/dcat-ap-forms/
COPY ./package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

CMD ["npm", "run", "start"]
