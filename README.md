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

1. POST `/demo/basic` - public endpoint with just the body parameter validation
2. POST `/demo/protected` - protected with header based API Key

Both the APIs require the body to contain atleast a single field `name`. An
example request body can be

```json
{
  "name": "foo"
}
```

The protected API requires an API Key to be provided in the header
`x-api-key` and must match the value provided in the `environment/.env` file
under field name `API_KEY`
