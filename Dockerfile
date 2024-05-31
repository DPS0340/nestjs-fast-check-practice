FROM node:lts-alpine as builder

WORKDIR /builder

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

RUN echo -e 'export BUN_INSTALL="~/.bun"\n\
    export PATH="$BUN_INSTALL/bin:$PATH"' > ~/.bashrc

SHELL ["/bin/bash", "-c"]

COPY . .

RUN cd /builder && ~/.bun/bin/bun i

RUN cd /builder && ~/.bun/bin/bun build

FROM node:lts-alpine

WORKDIR /app

RUN apk add curl bash

RUN curl -fsSL https://bun.sh/install | bash

RUN echo -e 'export BUN_INSTALL="~/.bun"\n\
    export PATH="$BUN_INSTALL/bin:$PATH"' > ~/.bashrc

SHELL ["/bin/bash", "-c"]

COPY . .

RUN cd /builder && ~/.bun/bin/bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/server.js"]
