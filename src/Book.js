/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */
import React, {Component} from 'react';
import BookShelfSelector from './BookShelfSelector';

export default class Book extends Component {

    render() {
        // console.log(this.props.book);
        // console.log(this.props.book.authors);
        // todo: fix UI when there's multiple authors
        return(
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`}}></div>
                    <BookShelfSelector book={this.props.book} changeShelf={this.props.changeShelf}/>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{
                    this.props.book.authors.map((author, index) => {
                        if (index === this.props.book.authors.length - 1) {
                            return author;
                        } else {
                            return author + ', ';
                        }
                    })
                }</div>
            </div>
        )
    }
}
