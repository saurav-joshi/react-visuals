import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import BookShelfOrchestrator from './BookShelfOrchestrator'

class BookSearch extends React.Component{
    state = {
        query:'',
        retrievedBooks:[],
        error:false,
        showLoading: 'none'
    }

    updateQuery = (query) => {
        this.setState({query: query}, this.submitSearch);

        }
    

    clearSearchResults = (query) => {
        this.setState({retrievedBooks: []});
      }

    submitSearch() {
        if(this.state.query === '' || this.state.query === undefined) {
          // Reset
          this.clearSearchResults();
          return;
        }
        //this.setState({showLoading: "block"});
        BooksAPI.search(this.state.query.trim(), 3).then((books) => {
          if(books.error && books.error === "empty query") {
            // Bad query; No Results
            this.setState({showLoading: "none", error: true, retrievedBooks: []});
          }
          else {
            if(this.state.retrievedBooks !== books) {
              this.setState({retrievedBooks: books});
            }
            //this.setState({showLoading: "none", error: false});
          }
        });
      }

      editShelf = (event, book ) => {
        const shelfName= event.target.value        
        BooksAPI.update(book, shelfName)
      
      }

      render() {
        const props = {key:"None", myData:this.state.retrievedBooks, shelfName:"None", onEditBookShelf: this.editShelf}
          return(
            <div className="search-books">
             <div className="search-books-bar">
             <Link 
               to='/'    
               className="close-search">Close 
             </Link>

              <div className="search-books-input-wrapper">
                {
                    <input type="text" 
                    placeholder="Search by title or author" 
                    value={this.state.query}
                    onChange={(event) => this.updateQuery(event.target.value)}
                    />
                }
              </div>
             </div>

             <div className="search-books-results">

                <hr />
                <ol className="books-grid">
                    {this.state.retrievedBooks.length > 0 && 
                    <BookShelfOrchestrator  {...props}/>
                    }
                </ol>
                {this.state.error && <p>No Results...</p>}
             </div>
            </div> 
          );
      }    
}

export default BookSearch