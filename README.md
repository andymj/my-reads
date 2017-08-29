This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


And the [My Reads starter project](https://github.com/udacity/reactnd-project-myreads-starter) from Udacity

Click on those links to see core details.

## Folder Structure

```
myreads/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    Book.js
    BookLibrary.js
    BooksAPI.js
    BookShelf.js
    index.css
    index.js
    logo.svg
    registerServiceWorker.js
    SearchBooks.js
```

Important Files:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point renders the App component into the index.html.
* `App.js` Parent Component passes the data to it's child Components; renders `SearchBooks` Component and `BookLibrary` Component.
* `SearchBooks.js` implements a component; it has the logic to fetch books by a query, and shows up the result if they exist.
* `BookLibrary.js` implements a component which renders the book shelfs on the home page.
* `BookShelf.js` implements a component which displays the books that belongs it's proper shelf.
* `Book.js` implements a component for a single book.
* `App.js` contains basic CSS styles which was already provided, it wasn't modified.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

