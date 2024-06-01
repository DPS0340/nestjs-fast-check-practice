FROM oven/bun:debian AS builder
WORKDIR /builder

SHELL ["bash", "-c"]

RUN apt update -y && apt install -y curl

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

SHELL ["bash", "-c"]

RUN apt update -y && apt install -y curl

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
