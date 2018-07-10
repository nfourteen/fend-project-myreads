/**
 * Copyright © 2018 Nfourteen. All rights reserved.
 */
import React, {Component} from 'react';

export default class BookShelfSelector extends Component {
    state = {
        currentShelf: this.props.book.shelf
    };

    changeShelf = (event) => {
        this.props.changeShelf(this.props.book, event.target.value);
        this.setState({ currentShelf: event.target.value });
    };

    render() {
        // console.log(this.state.currentShelf);
        return(
            <div className="book-shelf-changer">
                <select value={this.state.currentShelf} onChange={this.changeShelf}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}
