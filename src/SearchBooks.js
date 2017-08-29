import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

    state = {
        query: '',
        books: null
    }

    /**
     * @description look up for the books, update the state object and renders the component if it changes.
     * @param {String} query
     */
    searchBooks = (query) => {
        if (query) {
            BooksAPI.search(query, 20).then((result) => {
                if ( result.error ) {
                    this.setState({
                        books: null,
                        query: query
                    })
                    return;
                }

                this.setState({ 
                    query: query,
                    books: result 
                });
            })
        }
    }
    
    render() {
        const { shelfs, onMoveBook } = this.props;
        const { books } = this.state;
        const { currentlyReading, wantToRead, read} = shelfs;
        let title = 'Welcome, please search your book above :)';

        if (this.state.query !== '') {
            title = 'Sorry, there are not Books that matched your search';
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input onChange={(event) => this.searchBooks(event.target.value)} type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { !!books ? // if there are books show them, if not show failure message.
                            (books.map((book) => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        name={
                                            currentlyReading.includes(book.id) && "currentlyReading" ||
                                            wantToRead.includes(book.id) && "wantToRead" ||
                                            read.includes(book.id) && "wantToRead" ||
                                            "none"}
                                        onChangeShelf={onMoveBook}
                                    />
                                </li>
                            ))) : (<h2>{title}</h2>)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;