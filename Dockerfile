FROM oven/bun:debian AS builder
WORKDIR /builder

RUN apt update -y && apt install -y bash curl

SHELL ["bash", "-c"]

# Original code from https://stackoverflow.com/a/28390848/11853111
ENV nvm_dir /root/.nvm
ENV node_version 22

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash \
    && . $nvm_dir/nvm.sh \
    && nvm install $node_version \
    && nvm alias default $node_version \
    && nvm use default

COPY . .

RUN bun install

RUN . $nvm_dir/nvm.sh && npm run build

FROM oven/bun:debian
WORKDIR /app

RUN apt update -y && apt install -y bash curl

SHELL ["bash", "-c"]

ENV nvm_dir /root/.nvm
ENV node_version 22

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.39.7/install.sh | bash \
    && . $nvm_dir/nvm.sh \
    && nvm install $node_version \
    && nvm alias default $node_version \
    && nvm use default

COPY . .

RUN bun install --production

COPY --from=builder /builder/dist ./dist

CMD ["node", "dist/main.js"]
