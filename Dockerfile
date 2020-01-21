FROM node:10.16.0-alpine as production-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --production
# To handle 'not get uid/gid'
RUN npm config set unsafe-perm true
RUN npx modclean -r --no-progress

FROM node:10.16.0-alpine as build-dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

FROM node:10.16.0-alpine as builder
WORKDIR /app
COPY --from=build-dependencies /app/node_modules node_modules
COPY . .
RUN npm run build

FROM node:10.16.0-alpine
WORKDIR /app

RUN addgroup -S keptn && adduser -S -g keptn keptn \
  && chown -R keptn:keptn /home/keptn \
  && chown -R keptn:keptn /app

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.2/dumb-init_1.2.2_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

COPY --from=production-dependencies /app/node_modules node_modules
COPY --from=builder /app/dist dist

# Run everything after as non-privileged user.
USER keptn

ADD MANIFEST /

ENTRYPOINT ["dumb-init", "--"]
CMD ["sh", "-c", "cat /MANIFEST && node dist/main.js"]
