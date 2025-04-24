## Goal
Develop a REST API for a portfolio publication site.

# All users are able to:
● signup
● see image feed (image, image description, portfolio name that
contains this image) ordered by creation time

# Registered user should be able to:
● login, logout
● create portfolios
● have several portfolios
● upload image in his portfolios
● delete own profile
● delete own portfolios
● delete own images

# Portfolio:
● Should contain name, description, images
# Image:
● Should contain name, description, comments

## Key requirements:
● Should be implemented Error Handler with next statuses 400,
401, 403 and 404
● Should be implemented request validation
● Project should contains db migration files

## Technologies:
- Main-framework: Nest.js (Node.js)
- Databse: PostgreSQL
- ORM: Sequelize 

# Additional tech
- Class-transformer
- Class-validator

## Running the app

```bash
$ yarn install

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Migrations

generate file migration:
```
npx sequelize-cli migration:generate --name migration-name
```
migrate:
```
npx sequelize-cli db:migrate
```

## Env
```
PORT=7000
API_DOCS_ENABLED=true

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASS=password
POSTGRES_DB_NAME=lanars-task-db
POSTGRES_IS_LOGGING_ENABLED=false

JWT_SECRET=secret
JWT_EXPIRES_IN=1h
```

## Next steps
Here are some potential next steps and areas for further development and improvement:

- *Token Management with Redis*:
We can integrate a Redis database to enhance our JWT token management. Redis, being an in-memory data structure store, is ideal for quickly saving and checking token validity. This can be particularly useful for implementing features like:
- Token Blacklisting: Storing invalidated tokens (e.g., upon logout or when a security event occurs) in Redis allows us to quickly check if a presented token is still considered valid on the server-side, even before its natural expiration.
- Session Management (Optional): While JWTs are typically stateless, Redis can be used to store session-related data linked to a user's token, if needed for specific application requirements.
- Rate Limiting: Redis can be used to implement rate limiting based on user tokens or other identifiers.

Easier Development Setup: New developers can get the project running quickly by simply building and running the Docker containers.
# General
- Author: MoloZzz
- Licence: MIT