import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BookShelfChanger extends React.Component{
  static PropTypes={
    onEditBookShelf: PropTypes.func.isRequired
  }
  
  render() {
    const onEditBookShelf = this.props.onEditBookShelf;
    const bookName = this.props.bookName;
    return (
      <div className="book-shelf-changer">
        <select onChange= {(value) => onEditBookShelf(value, bookName)} >
          <option value="none" >Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

// function handleChange(event){
//         alert("The input value has changed. The new value is: " + event.target.value ); //event.target.value 
      
//       }

// function BookShelfChanger(props)
// {
//   return(
//   <div className="book-shelf-changer">
//   <select onChange= {(v) => handleChange(v)} >
//     <option value="none" disabled>Move to...</option>
//     <option value="currentlyReading">Currently Reading</option>
//     <option value="wantToRead">Want to Read</option>
//     <option value="read">Read</option>
//     <option value="none">None</option>
//   </select>
// </div>
//   );

// }

function BookDetails_js(props)
{
  const bookDetails= props.myData.filter((data)=> data.shelf.toLowerCase() == props.myShelf);  
  const listItems = bookDetails.map((book)=>
 
    <div className="book" key = {book.imageLinks.thumbnail} >
    <div className="book-top">
    <div className="book-cover" style= {{width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}} > </div>
      <BookShelfChanger onEditBookShelf = {props.onEditBookShelf} bookName= {book}/>                                                                  
    </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>

  );
  
  return (
   
           <div className="bookshelf">
          <h2 className="bookshelf-title">{props.myShelfName}</h2>
          <div className="bookshelf-books"> 
           {listItems} 
           </div>
           </div>
  );
}

class AppsNew extends React.Component
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
    //alert("The input value has changed. The new value is: " + event.target.value + " " +book.bookName);
    const newbookshelf= event.target.value
    this.setState((state) => ({
      booksData : state.booksData.filter((b) => b.title == book.title ? b.shelf = newbookshelf: b.shelf = b.shelf)
    })) 

  } 

   render() {
    return(
    <div className="list-books">
      <ol className="books-grid">
        <BookDetails_js onEditBookShelf = {this.editBookShelf} myData = {this.state.booksData} myShelf= "currentlyreading"  myShelfName ="Currently Reading"/>    
      </ol>
      <ol>
      <BookDetails_js onEditBookShelf = {this.editBookShelf} myData = {this.state.booksData} myShelf= "wanttoread"  myShelfName ="Want to Read"/>
      </ol> 
      <ol>
      <BookDetails_js onEditBookShelf = {this.editBookShelf} myData = {this.state.booksData} myShelf= "read"  myShelfName ="Read"/>
      </ol> 
    
<div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
</div>

</div>
);
}

}

export default AppsNew