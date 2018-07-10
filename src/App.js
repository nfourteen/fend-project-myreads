import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import BookList from './BookList';
import {Route, Link} from 'react-router-dom';

export default class BooksApp extends React.Component {
    state = {
        showSearchPage: false,
        books: []
    };

    componentDidMount() {
        this.getBooks();
    }

    getBooks() {
        BooksAPI.getAll().then(books => {
            // console.log(books);
            this.setState({books});
        });
    }

    getBooksOnShelf(name) {
        return this.state.books.filter(book => book.shelf === name);
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(response => {
            this.getBooks();
        });
    };

    render() {
       return <div className="app">
           <Route exact path='/' component={SearchLink}/>
           <Route exact path='/' component={BookShelves}/>

           <Route path="/search" render={() =>
               <Search changeShelf={this.changeShelf} />}
           />
        </div>
    }

}

class SearchLink extends React.Component {
    render() {
        return <div className="open-search">
            <Link to="/search">Add a book</Link>
        </div>
    }
}

class SearchError extends React.Component {
    render() {
        return <div className="search-error">
            <p>Sorry, no results match this query. Please try another.</p>
        </div>
    }
}

class Search extends BooksApp {
    state = {
        query: '',
        results: [],
        error: false
    };

    queryBooks = event => {
        const query = event.target.value;

        if (query) {
            this.setState({query: query});

            BooksAPI.search(query).then(response => {
                // console.log(response);
                if (response.error) {
                    this.setState({results: [], error: true});
                } else {
                    // set sensible defaults for books missing data, ex. authors, shelf
                    response.forEach(book => {
                        if (typeof book.authors === 'undefined') {
                            // console.log(book);
                            book.authors = [];
                        }
                        if (typeof book.shelf === 'undefined') {
                            book.shelf = 'none';
                        }
                        if (typeof book.imageLinks === 'undefined') {
                            book.imageLinks = {smallThumbnail: '', thumbnail: ''};
                        }

                        // the search API doesn't return the same shelf state, so
                        // update the book from search results to the app's current shelf state
                        let bookOnShelf = this.state.books.find(b => b.id === book.id);
                        if (bookOnShelf) {
                            book.shelf = bookOnShelf.shelf;
                        }
                        // console.log(bookOnShelf);
                    });
                    this.setState({results: response, error: false});
                }
            });
        } else { // empty query
            this.setState({results: [], query: '', error: false});
        }
    };

    render() {
        // console.log(this.state.results);
        let render;
        if  (this.state.error) {
            render = <SearchError/>;
        } else {
            render = <BookList books={this.state.results} changeShelf={this.props.changeShelf}/>;
            /*<ol className="books-grid"></ol>*/
        }
        return <div className="search-books">
            <div className="search-books-bar">
                <Link className="close-search" to="/">Close</Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" autoFocus value={this.state.query} onChange={this.queryBooks}/>
                </div>
            </div>
            <div className="search-books-results">
                {render}
            </div>
        </div>
    }
}

class BookShelves extends BooksApp {

    render() {
        return <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title='Currently Reading' books={this.getBooksOnShelf('currentlyReading')} changeShelf={this.changeShelf}/>
                        <BookShelf title='Want To Read' books={this.getBooksOnShelf('wantToRead')} changeShelf={this.changeShelf}/>
                        <BookShelf title='Read' books={this.getBooksOnShelf('read')} changeShelf={this.changeShelf}/>
                    </div>
                </div>
            </div>
    }
}
