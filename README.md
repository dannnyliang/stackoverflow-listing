# StackOverflow Listing

🌐 [Site](https://stackoverflow-listing.vercel.app/)

Search StackOverflow tags and questions.\
This project was bootstrapped with [Customed Create React App](https://github.com/dannnyliang/cra-template).

## Setup
clone the project and install needed packages.

```bash
git clone git@github.com:dannnyliang/stackoverflow-listing.git && cd stackoverflow-listing && yarn
```

## Development
Runs the app in the development mode.\
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

```bash
yarn start
```

## Features
- Search related tags.
- Search questions according to selected tag.
- Redirect to question page in StackOverflow upon click question item.
- Infinite fetch and scroll question list.

## Data source
using [StackExchange API](https://api.stackexchange.com/docs) to fetch StackOverflow tags and questions data.
