## Description

### Motivation

Testing is important, but making testing is hard, so some developers even don't make tests.
So, I decided to make and show example repository using property based testing propery in nestjs ecosystem.

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

- You'll better to run github actions based ci action.