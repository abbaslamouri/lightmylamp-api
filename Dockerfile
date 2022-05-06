FROM node:18-alpine
WORKDIR /app
COPY package*.json .
ARG NODE_ENV
# RUN npm install

RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi
COPY . .

# RUN if [ "$NODE_ENV" = "production" ]; \
RUN npm run build
  # fi
ENV PORT 5000
EXPOSE $PORT
RUN ls -la

# CMD ["npm", "run", "dev"]
CMD ["node", "dist/server.js"]




