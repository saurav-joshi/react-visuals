import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookSearch extends React.Component {

    state = {
        query:'',
        newBooks: [],
        searchErr: false
    }

    updateQuery = (query) =>{
        this.setState({ query:query.trim() })
        //alert("The input value has changed. The new value is: " + query );
        if (query) {
        BooksAPI.search(query, 10).then((books) => {
            books.length > 0 ?  this.setState({newBooks: books, searchErr: false }) : this.setState({ newBooks: [], searchErr: true })
          })
      } else this.setState({newBooks: [], searchErr: false })

    }

    render(){
        const { query, newBooks, searchErr } = this.state

        return (

            <div className="search-books">
            <div className="search-books-bar">

            <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                
                <input type="text" 
                placeholder="Search by title or author"
                value = {this.state.query}
                onChange = {(event) => this.updateQuery(event.target.value)}
                />

              </div>
            </div>

            <div className="search-books-results">
               {newBooks.length > 0 && (
                   <div>
                       <div className =''>
                       <h3> Search returned { newBooks.length} books </h3>
                       </div>
                       <ol className="books-grid">
                            {newBooks.map((book) => (
                                <Book
                                book={ book }
                                books={ books }
                                key={ book.id }
                                changeShelf={ changeShelf }
                                />
                            ))}
                        </ol>
                    </div>    
               )}
              { searchErr  && (
              <div>
                <div className=''>
                  <h3>Search returned 0 books.  Please try again!</h3>
                  </div>
                </div>
            )}
            </div>
          </div>

        );
    }

} 

export default BookSearch