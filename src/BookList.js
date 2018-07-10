/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */


import React, {Component} from 'react';
import Book from "./Book";

export default class BookList extends Component {
    render() {
        return(
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.id} className="contact-list-item">
                        <Book book={book} changeShelf={this.props.changeShelf} />
                    </li>
                ))}
            </ol>
        )
    }
}
