# We can not use slim version here as the install requires build dependencies.
FROM node:26.13.1

WORKDIR /opt/dcat-ap-forms/
COPY ./package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build

CMD ["npm", "run", "start"]
