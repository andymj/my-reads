import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Debounce } from 'react-throttle';
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

    /**
     * @description looks up if the book on search results is already on the shelves
     * @param {Object} book
     * @param {Array} booksInShelves
     * @return {String} the name of the shelf if any, otherwise 'none'
     */
    getShelf(book, booksInShelves) {
        let shelf = 'none';
        
        booksInShelves.forEach(b => { 
            if (book.id === b.id) {
                shelf = b.shelf;
            }
        });

        return shelf;
    }
    
    render() {
        const { booksInShelves, onMoveBook } = this.props;
        const { books, query } = this.state;
        let title = query !== '' ? 'Sorry, there are not Books that matched your search' :
            'Welcome, please search your book above :)';

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="100" handler="onChange">
                            <input onChange={(event) => this.searchBooks(event.target.value)} type="text" placeholder="Search by title or author" />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { !!books ? // if there are books show them, if not show failure message.
                            (books.map((book) => {
                                const shelf = this.getShelf(book, booksInShelves);
                                console.log(book.title);
                                return (<li key={book.id}>
                                    <Book
                                        book={book}
                                        name={shelf}
                                        onChangeShelf={onMoveBook}
                                    />
                                </li>)
                            })) : (<h2>{title}</h2>)}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;