import React from 'react'
import PropTypes from 'prop-types'
import {shelfs} from './BookShelf'
  
class BookShelfOrchestrator extends React.Component{

    static PropTypes={
        onEditBookShelf: PropTypes.func.isRequired
    }

    displaySearchResults = (listItems) =>{
        return (
        <div className="search-books-results">
            <ol className="books-grid">
            {listItems}
            </ol>
        </div>
        );
    }

    displayBookShelfs = (listItems, shelfName) => {

        return (
        
        <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid"> 
            {listItems} 
        </ol>
        </div>
        </div>
        );
    }

    addNavigation = (book, shelfName, onEditBookShelf) =>{
        return (
        <div className="book-shelf-changer">
            <select value={shelfs[shelfName]} onChange={(value) => onEditBookShelf(value, book)} >
            <option value="none" >Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
            </select>
        </div>
        );
    }

    arrangeBookShelf = (book, shelfName, onEditBookShelf) => {
        const bookUrl = book.imageLinks === undefined ? "":book.imageLinks.smallThumbnail
        return (
            <div className="book" key={book.id} >
            <div className="book-top">
            <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${bookUrl})` }} > </div>
                {this.addNavigation(book, shelfName, onEditBookShelf)}
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            </div>
        );

    }

    render() {
        
        const {myData, shelfName, onEditBookShelf} = this.props;
        let bookDetails = myData;    
        if(shelfName !== "None")
        {
        bookDetails= myData.filter((data)=> data.shelf.toLowerCase() === shelfName);
        }

        const listItems = bookDetails.map( (book)=> this.arrangeBookShelf(book, shelfName, onEditBookShelf) );
        
        const resultSet = (shelfName === "None") 
            ? this.displaySearchResults(listItems) 
            : this.displayBookShelfs (listItems, shelfs[shelfName])

        return resultSet

    }
}

export default BookShelfOrchestrator;