# SolidStart

Everything you need to build a Solid project, powered by [`solid-start`](https://start.solidjs.com);

## Creating a project

```bash
# create a new project in the current directory
npm init solid

# create a new project in my-app
npm init solid my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

Solid apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.

# solid-movies

This was adapted from the Nuxt version: https://github.com/tastejs/nuxt-movies

A SolidStart Movies application using [The Movie Database (TMDb)](https://developers.themoviedb.org/3) API. Built using [Solid](https://github.com/solidjs/solid) and [SolidStart](https://github.com/solidjs/solid-start). Our version is built by the Solid team.

## Quick setup

1. Take a copy of `.example.env` and re-name to `.env`
2. Get your [TMDb](https://developers.themoviedb.org/3) API key
3. Get your [YouTube](https://developers.google.com/youtube/v3/getting-started) API key (optional, used for video data)
4. Enter the details into the `.env` file

## Running

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev
```

