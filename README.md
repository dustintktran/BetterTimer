# BetterTimer
Better timer for working out and stuff

## Install Software And Tools

1. Install Docker Desktop: [Link to Docker Engine](https://docs.docker.com/engine/install/)

2. Install Homebrew: [Link to Homebrew](https://brew.sh/)
3. Install NVM, Node, and Yarn
    ```
    brew install nvm
    nvm install node
    brew install yarn
    ```
4. Setup SSH key to use with gitlab

5. Clone the repository:

6. Install the flyway cli (Database Migration Manager):
    ```
    brew install flyway
    ```

7. Setup Environment Variables (.envrc)

## Setup And Run

Before running server, ensure all containerized dependent services are up and running on docker.

```
docker compose up --build -d
```

The app will be accessible from http://localhost:3000.

## Running Tests

| Tests to Run                                      | Command(s)                                                                                                                                                                                                                  |
|:--------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| All tests (frontend, backend, journey, libraries) | Run `SPRING_PROFILES_ACTIVE=acceptance ./gradlew bootrun` in one terminal and `./gradlew test` in another terminal                                                                                                          |
| Backend tests                                     | Run `./gradlew :backend:test`.                                                                                                                                                                                              |
| Frontend tests                                    | Run `./gradlew :frontend:test` from root directory <br><br>Alternatively, in `frontend` directory, run `yarn test`.                                                                                                         |
| Cypress tests - dev                               | Run `SPRING_PROFILES_ACTIVE=acceptance ./gradlew bootrun` from root directory in one terminal. <br>In `acceptance` directory:<br> run `yarn acceptance-open` to run with GUI <br> run `yarn acceptance-run` to run headless |