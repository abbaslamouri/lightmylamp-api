FROM node:18-alpine
WORKDIR /app
COPY package*.json .
# RUN npm install
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

COPY . ./
RUN npm run build
ENV PORT 5000
EXPOSE $PORT
RUN ls -la
# CMD ["npm", "run", "dev"]
CMD ["node", "dist/server.js"]




