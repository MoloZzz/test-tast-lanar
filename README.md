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
```
generate file migration:
npx sequelize-cli migration:generate --name migration-name
migrate:
npx sequelize-cli db:migrate
```
# General
- Author: MoloZzz
- Licence: MIT