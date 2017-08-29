import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf';

class BookLibrary extends Component {
    render() {
        const {onMoveBook, categories} = this.props;
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
                            books={categories.currentlyReading} />
                        <BookShelf 
                            onMoveBook={onMoveBook} 
                            name="wantToRead" 
                            shelfTitle="Want to Read" 
                            books={categories.wantToRead} />
                        <BookShelf 
                            onMoveBook={onMoveBook} 
                            name="read" 
                            shelfTitle="Read" 
                            books={categories.read} />
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