## Description

### Motivation

Testing is important, but make testing is hard, so some developers even don't make tests.

So, I decided to make example repository based on properly used property based testing, on nestjs ecosystem.

## Installation

```bash
$ bun install
```

## Running the app

```bash
# development
$ devspace run
```

## Test

```bash
# unit tests
$ devspace run
$ kubectl exec -it deploy/nestjs-fast-check-practice -- /bin/bash -c ". /root/.nvm/nvm.sh && npm run test"
```

- You'll better to run github actions based ci.

## License

MIT
