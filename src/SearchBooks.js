import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {

    state = {
        query: '',
        books: null
    }

    updateQuery = (query) => {
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
        const { goHome, onSearch, shelfs, onMove } = this.props;
        const { books } = this.state;
        const { currentlyReading, wantToRead, read} = shelfs;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input onChange={(event) => this.updateQuery(event.target.value)} type="text" placeholder="Search by title or author" />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        { !!books ?
                            (books.map((book) => (
                                <li key={book.id}>
                                    <Book
                                        book={book}
                                        name={
                                            currentlyReading.includes(book.id) && "currentlyReading" ||
                                            wantToRead.includes(book.id) && "wantToRead" ||
                                            read.includes(book.id) && "wantToRead" ||
                                            "none"}
                                        onChangeShelf={this.props.onMove}
                                    />
                                </li>
                            ))) : ''}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;