import React from 'react'
import { Route } from 'react-router-dom';
import BookLibrary from './BookLibrary';
import * as BooksAPI from './BooksAPI';
import './App.css';

import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
	state = {
		books: [],
		categories: {
			currentlyReading: [],
			wantToRead: [],
			read: []
		},
		searchResult: []
	};

	/**
	 * @description get the books from the BooksApi, and update the state object properties.
	 */
	getBooks() {
		BooksAPI.getAll().then((books) => {
			this.setState({
				books
			})
		});
	}

	componentDidMount() {
		this.getBooks();
	}

	/**
	 * @description updates or moves the Book to a different shelf and get all the books to include the updated Book.
	 * @param {Object} book the book we want to move to a different shelf
	 * @param {string} shelf 
	 */
	onMoveBook = (book, shelf) => {
		if (book.shelf !== shelf) {
			BooksAPI.update(book, shelf).then(() => {
				book.shelf = shelf;
				this.setState(state => ({
					books: state.books.filter(b => b.id !== book.id).concat([ book ])
				}));
			});

		}
	}

	render() {
		const { books } = this.state;
		const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
		const wantToRead = books.filter(book => book.shelf === 'wantToRead');
		const read = books.filter(book => book.shelf === 'read');
		return (
			<div className="app">
				<Route exact path='/search' render={() => (
					<SearchBooks
						booksInShelves={books}
						onMoveBook={this.onMoveBook}
					/>
				)} />
				<Route exact path='/' render={() => (
					<BookLibrary
						onMoveBook={this.onMoveBook}
						categories={ {currentlyReading, wantToRead, read} }/>
				)} />
			</div>
		);
	}
}

export default BooksApp
