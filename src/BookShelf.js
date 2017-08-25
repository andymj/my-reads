import React, { Component } from 'react'

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
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                            <select value={name} onChange={(event) => this.props.onMoveBook(book,event.target.value) }>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors.join(', ')}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;