# Ultimate Bot

A simple HTTP RESTful API (for a bot 🤖) which takes a visitor message and through intents provided by https://ultimate.ai public api it returns approriate reply.

## How to run

**NOTE** - Please ensure:

- You have mongodb installed and running or you have uri to a running instance.
- You have the environment variables described in `./env` file in the root.

Run a simple migration for the provided example replies as follows:

```
$ npm run run-migration
```

To start development mode:

```
$ npm run start:dev
```

To build and run:

```
$ npm run build && npm run start
```