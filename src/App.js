import React, { Component } from 'react';
import {Route } from 'react-router-dom'
import BookSearch from './BookSearch'
import BookShelf from './BookShelf'

class App extends Component{
    render(){
        return (
            <div className="app">

            <Route exact path='/' render={({ history }) => (
                <BookShelf />
                
              )}/>
            <Route exact path='/search' render={({ history }) => (
                <BookSearch onEditBookShelf />
                
              )}/>

            </div>

        )
    }
}
export default App;