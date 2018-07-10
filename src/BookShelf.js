/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */

import React, {Component} from 'react';
import BookList from "./BookList";

export default class BookShelf extends Component {
    render() {
        return(
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <BookList books={this.props.books} changeShelf={this.props.changeShelf}/>
                </div>
            </div>
        )
    }
}
