import React from 'react'
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import './App.css'

import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    books:[],
    categories: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    },
    searchResult: []
  }

  componentDidMount() {
    BooksAPI.getAll().then( (books) => {
      this.setState({
        books,
        categories: {
          currentlyReading: books.filter( (book) => book.shelf === 'currentlyReading').map((book) => book.id),
          wantToRead: books.filter((book) => book.shelf === 'wantToRead').map((book) => book.id),
          read: books.filter((book) => book.shelf === 'read').map((book) => book.id)
        }
      })
      
    });
    console.log('here');
  }

  onMoveBook = (book, shelf) => {
    BooksAPI.update({id: book.id}, shelf).then((response) => this.setState({
        categories: {
          currentlyReading: response.currentlyReading,
          wantToRead: response.wantToRead,
          read: response.read
        }
      })
    );
  }

  //TODO: Categorize each book by it's shelf.


  render() {
    return (
      <div className="app">
        <Route exact path='/search' render={() => (
          <SearchBooks 
            shelfs={this.state.categories} 
            onMove={(book, shelf) => {
              this.onMoveBook(book, shelf);
            }}
          />
        )} />
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf onMoveBook={this.onMoveBook} name="currentlyReading" shelfTitle="Currently Reading" shelf={this.state.categories.currentlyReading} books={this.state.books} />
                <BookShelf onMoveBook={this.onMoveBook} name="wantToRead" shelfTitle="Want to Read" shelf={this.state.categories.wantToRead} books={this.state.books} />
                <BookShelf onMoveBook={this.onMoveBook} name="read" shelfTitle="Read" shelf={this.state.categories.read} books={this.state.books} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
