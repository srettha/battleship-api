# Battleship-api

[![CircleCI](https://circleci.com/gh/thestrayed/battleship-api.svg?style=svg)](https://circleci.com/gh/thestrayed/battleship-api)
[![Coverage Status](https://coveralls.io/repos/github/thestrayed/battleship-api/badge.svg?branch=master)](https://coveralls.io/github/thestrayed/battleship-api?branch=master)

## About this project

This project is built to demonstrate Battleship game which is simple yet challenging problem to solve. The application provides simple endpoints for user to use as follows:

1. **/api** - Get the current state of the ocean an the fleet

1. **/api/attack** - Attack to a specific target on the ocean. User can attack on any specific target on the ocean by giving coordinates. The application will check across the system to see first whether the fleet is empty or not. Then check whether it's illegal to attack or not

    - If player attempt to attack any attacked coordinates or illegal to attack, the application shall reject the request and return `BAD_REQUEST` error
    - If the fleet is not empty, the application shall reject the request and return `UNAUTHORIZED` error

    - If the attack doesn't hit any target, the application shall return `Miss` status
    - If the attack hit any target, the application shall return `Hit` status
    - If the attack sink that target(ship), the application shall return message containing which ship has been sunk
    - If the attack sink the last target(ship), the application shall return message `Gameover` along with `number of shots were fired` and `missed shots`.

1. **/api/reset** - Reset game to an initial state

1. **/api/ship** - Place a single ship into the ocean. User can place ship on any specific place on the ocean by giving ship name along with coordinate and ship direction (horizontal or vertical). The application will check across the system to see first whether that particular type of ship can be placed or not. Then check whether it's illegal to place on that particular coordinate or not (adjacent or overlay)

    - If not, the application shall return `placed` message with ship type
    - If yes, the application shall reject the request and return `BAD_REQUEST` error

## API documentation

Here is a __[link](https://documenter.getpostman.com/view/4100480/S1M3w655?version=latest)__ an example of `API` calls from POSTMAN

In `API` calls from POSTMAN, There is example of api requests to complete the whole game.

- [`Ship placement`](https://documenter.getpostman.com/view/4100480/S1M3w655?version=latest#00434d63-97f5-46b5-8b7e-3391ad3031ff) folder which contains subfolders inside for each type of ship will place standard ships to the ocean (Battleship, Cruiser, Destroyer and Submarine)

- [`Attack`](https://documenter.getpostman.com/view/4100480/S1M3w655?version=latest#5b5ea461-5afe-4018-8082-7d7a8ecbec9e) which contains subfolders inside will attack every ships on the ocean

- [`Get game's status`](https://documenter.getpostman.com/view/4100480/S1M3w655?version=latest#e0a183ed-2644-4928-a66e-0d16c8b56e6f) will get current game status

- [`Reset game`](https://documenter.getpostman.com/view/4100480/S1M3w655?version=latest#8d563399-026e-4c14-a986-bc4abc9138b9) will reset game back to original state

The application itself also comes with its own api documentation: **/api-docs** with the help of these libraries:

- `swagger-js-doc`

- `swagger-ui`

## Getting Started

### Prerequisite

1. Make sure you have `docker` and `docker-compose` installed.

2. Clone project.

3. Run following command at the root of project in order to get both application and database running

```bash
docker-compose up
```

### Test

Run the following command to execute test:

```bash
yarn test
```

## Room for improvement

With the given time constraint, this project is quickly put together to demonstrate the ability of Node.js and its ecosystem with Battleship as an example. Though, this project is fully functional, there are still parts that can be improved as follows:

### 1. Add more test coverage

    - Add more unit tests
    - Add integration tests with `docker-compose`

### 2. Add new endpoints

    - Currently there are mutiple services that have its functionality ready to be extend to controllers to create endpoints for that as follows:

        - `rule` to create CRUD e.g. `/api/rules`

        - `ship` to create CRUD e.g. `/api/ships`

    - Query history of the games, with this functionality the sytem can return history of the game or even leaderboard for the whole application.

### 3. Normalize database

### 4. Convert to Typescript

    - With `Typescript`, the application would be easier to read (author's preference) and the whole code base would look cleaner and it would be easier to detect incorrect type.
