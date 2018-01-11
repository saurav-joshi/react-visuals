import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Link } from 'react-router-dom'
import BookShelfOrchestrator from './BookShelfOrchestrator'
import './App.css'

export const shelfs = {
  none: 'none',
  currentlyreading: "Currently Reading",
  wanttoread: "Want to Read",
  read: "Read",
  //
  currentlyReading: "currentlyReading",
  wantToRead: "wantToRead",
  bookShelf: ["currentlyreading", "wanttoread", "read"]
}

class BookShelf extends React.Component
{  
  state = {
    booksData:[]
  
  }

  componentDidMount(){
  BooksAPI.getAll().then((booksData)=>{
    this.setState({booksData:booksData})
    })

  }
  
  editBookShelf = (event, book) => {
    const newbookshelf= event.target.value
    this.setState((state) => ({
      booksData : state.booksData.filter((b) => b.title === book.title ? b.shelf = newbookshelf: b.shelf = b.shelf)
    }))

    BooksAPI.update(book, newbookshelf)
  } 

   render() {
     
    return(
      
  <div>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <ol>
              {shelfs.bookShelf.map((shelf) => {const props = {key:shelf, myData:this.state.booksData, shelfName:shelf, onEditBookShelf: this.editBookShelf};
                                                return <BookShelfOrchestrator {...props} />} 
                                    )}
            </ol>
        </div>
      </div>

     <div className="open-search">
        <Link to="/search">Add a book</Link>
     </div> 
     
  </div> 

    
);


}

}

export default BookShelf;