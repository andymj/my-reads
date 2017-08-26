import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class BookLibrary extends Component {
    render() {
        const {onMoveBook, books, categories} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            onMoveBook={onMoveBook} 
                            name="currentlyReading" 
                            shelfTitle="Currently Reading" 
                            shelf={categories.currentlyReading} 
                            books={books} />
                        <BookShelf 
                            onMoveBook={onMoveBook} 
                            name="wantToRead" 
                            shelfTitle="Want to Read" 
                            shelf={categories.wantToRead} 
                            books={books} />
                        <BookShelf 
                            onMoveBook={onMoveBook} 
                            name="read" 
                            shelfTitle="Read" 
                            shelf={categories.read} 
                            books={books} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default BookLibrary;