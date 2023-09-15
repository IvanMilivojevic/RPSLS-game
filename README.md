This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Project also includes TypeScript and ESLint - enabled during project initialization/bootstrapping.

No additional packages/libraries are used, except Prettier for code formatting.

## Running the Project

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project and play a game.

## Setup requirements, development/testing environment

Tested/developed on Windows 11
Node 18.16.0
git version 2.40.1.windows.1
IDE - Visual Studio Code 1.78.2

Several extensions can be installed to help with development, testing and checking for errors

- ESLint
- GitLens
- Import Cost
- Prettier
- REST Client (this one is good for testing API endpoints, and game-service-api-test.http file has all used endpoints)

## Additional improvements

### Multiuser implementation

This can be implemented by using a Register/Login form on the frontend side. After user is registered, we can remember user in a JSON file on server (simulating some database).
After that we can provide back the generated ID which is unique for that user (it can be stored in a cookie on frontend side). After sending each request to the backend like

- Playing a game and sending a payload with user choice, we can read cookie and based on ID/token write the result to a specific user-related results data
- Sending request for getting back results for displaying scoreboard - we can read cookie and return back appropriate results only for that user

In general this logic should be of course implemented with some regular database, but JSON can be implemented for this purpose. It follows a structure for results like this:

- JSON file is an object
- Each Key is ID of a user and this key/ID has a value which is an array of results (same as implemented content/results.json) just specific for a user who played the game

### Refactors

- Many components on the frontend side, could be further optimized and split into some smaller, more reusable components.
- We can use .env variables for keeping the URLs of endpoints inside (internal and external alike)
- Some hardcoded strings can be placed inside of constants so that they can be easier changed later on (game logic function for example)
