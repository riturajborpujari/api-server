# API Server boilerplate

## Requirements

- Node.js

## Setup

- Run `npm install` to setup Node.js dependencies
- Run `cp environment/.env.example environment/.env` to copy the example env as
  the source `.env`
- Run `npm run dev` to start the dev server

## Usage (demo apis)

The boilerplate comes with demo API routes, contained in the `src/demo`
sub-directory inside the project root

## Public route

POST `/demo/basic` - public endpoint with just the body parameter validation

example curl

```shell
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"name": "foo"}' \
    localhost:3000/demo/basic
```

the API would fail with proper error if the body parameter `name` is not
provided.

## Protected route

POST `/demo/protected` - protected with header based API Key

example curl

```shell
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -H "x-api-key: top-secret-stuff" \
    -d '{"name":"bar"}'
    localhost:3000/demo/protected
```
