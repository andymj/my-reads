import React, { Component } from 'react'
import Book from './Book';

class BookShelf extends Component {
    // pass books as props
    // e.g this.props.books
    render() {
        const { shelfTitle, name, books} = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book 
                                    book={book}
                                    name={name}
                                    onChangeShelf={this.props.onMoveBook}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;