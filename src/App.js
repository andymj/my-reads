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
	 * get the books from the BooksApi, and update the state object properties.
	 */
	getBooks() {
		BooksAPI.getAll().then((books) => {
			this.setState({
				books,
				categories: {
					currentlyReading: books.filter((book) => book.shelf === 'currentlyReading').map((book) => book.id),
					wantToRead: books.filter((book) => book.shelf === 'wantToRead').map((book) => book.id),
					read: books.filter((book) => book.shelf === 'read').map((book) => book.id)
				}
			})
		});
	}

	componentDidMount() {
		this.getBooks();
	}

	/**
	 * update the Book to a different shelf and get all the books to include the updated Book.
	 * @param {Object} book the book we want to move to a different shelf
	 * @param {string} shelf 
	 */
	onMoveBook = (book, shelf) => {
		BooksAPI.update({ id: book.id }, shelf).then((response) => this.getBooks());
	}

	render() {
		return (
			<div className="app">
				<Route exact path='/search' render={() => (
					<SearchBooks
						shelfs={this.state.categories}
						onMoveBook={this.onMoveBook}
					/>
				)} />
				<Route exact path='/' render={() => (
					<BookLibrary
						onMoveBook={this.onMoveBook}
						categories={this.state.categories}
						books={this.state.books} />
				)} />
			</div>
		);
	}
}

export default BooksApp
