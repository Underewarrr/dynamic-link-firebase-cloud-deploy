# Firebase Dynamic Link Generator

## Overview

This system allows for the generation of dynamic links using the Firebase Dynamic Links API. The generated links can be used for sharing and directing users to specific content in mobile apps and on the web.

## Requirements

- Node.js
- Next.js
- React
- Firebase Project with Firebase Dynamic Links enabled

## Configuration

1. **Firebase Project**: Ensure you have a project set up in the Firebase Console and that Firebase Dynamic Links is enabled for this project.

2. **API Key**: Obtain the Firebase API key from the Firebase Console, which is necessary to authenticate requests to the Firebase Dynamic Links API.

3. **Dynamic Link Domain**: Register a dynamic link domain in the Firebase Console and configure it as needed.

4. **Development Environment**: Set up a `.env.local` file at the root of your Next.js project to store API keys and other sensitive information.

    ```
    FIREBASE_API_KEY=YOURKEY
    FIREBASE_DYNAMIC_LINK=YOUR FIREBASE DYNAMIC LINK DOMAIN
    ```


## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own


## How to use

 npm dependencies by running:
```
npm install
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

