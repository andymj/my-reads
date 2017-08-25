import React, { Component } from 'react'
import Book from './Book';

class BookShelf extends Component {
    // pass books as props
    // e.g this.props.books
    constructor(props) {
        super(props);
        this.state = {shelfBooks: props.shelf};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ shelfBooks: nextProps.shelf });
        console.log('updating');
    }

    render() {
        const { shelfTitle, name, books} = this.props;
        const { shelfBooks } = this.state;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfTitle}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter((book) => ~shelfBooks.indexOf(book.id) ).map((book) => (
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