import React, { Component } from 'react';
import './App.css';
import Box from './Components/Box';
import Plus from './Components/Plus';
import axios from 'axios';

class App extends Component {

  constructor(){
    super();

    this.state = {
      user_input:"",
      search_string: "",
      movies: []
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.removeBox = this.removeBox.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  componentDidMount(){
    const apiURL = 'http://localhost:3005/api/movies';
    axios.get( apiURL ).then( response => {
      console.log(response);
      this.setState({
      movies: response.data 
      }) 
    })
  }

  handleChange(value){
    this.setState({user_input:value})
  }

  handleClick(){
    const apiURL = 'http://localhost:3005/api/movies';
    this.setState({search_string:this.state.user_input})
    // axios.get( apiURL ).then( response => {
    //   this.setState({
    //     movies: response.data
    //   })
    // })
    axios.post( apiURL, {
      user_input: this.state.user_input
    })
    .then( response => {
      this.state.movies.push(response.data)
      this.forceUpdate();
    })
  }

  removeBox(index){
    const apiURL = 'http://localhost:3005/api/movies';
    //make the change to the front end
    let temp = this.state.movies.slice();
    temp.splice(index,1);
    this.setState({movies: temp})
    //need to also make the change on the server WORKING!!
    axios.delete( apiURL+'/'+index, {
      remove: index
    }).then( response => {
      console.log(response.data)
    })
  }

  moveLeft(index){
    // let temp = this.state.movies.slice(); //THIS WILL ONLY MAKE A SHALLOW COPY
    const apiURL = 'http://localhost:3005/api/movies'

    if(index === this.state.movies.length - 1){
      return
    }

    let tempArray = this.state.movies.map( (e) => {
      return Object.assign(e)
    }) //one level deeper copy of array, although there is still an array inside of the object that might cause probs
    
    let removed = tempArray.splice(index+1,1);
    removed = Object.assign(removed);
    // console.log(removed);
    tempArray.splice(index,0,removed[0]);

    this.setState({movies:tempArray})

    //NOW MAKE THE CHANGE ON THE SERVER

    // axios.put(apiURL+'/'+index, {
    //   moveToLeft: index
    // }).then( response => {
    //   console.log(response.data)
    //   this.setState({
    //     movies: response.data
    //   })
    // })

  }

  moveRight(index){
    // let temp = this.state.movies.slice(); //THIS WILL ONLY MAKE A SHALLOW COPY

    if (index === 0){
      return
    }

    let tempArray = this.state.movies.map( (e) => {
      return Object.assign(e);
    })

    let removed = tempArray.splice(index-1,1);
    removed = Object.assign(removed);
    tempArray.splice(index,0,removed[0])

    this.setState({movies: tempArray})

    //NOW MAKE THE CHANGE ON THE SERVER


  }

  render() {
    //JS goes here
    let movies = this.state.movies.map( (e,i) => {
      // console.log(e.poster_path);
      return (
          <Box key={i} left={this.moveLeft} right={this.moveRight} index={i} remove={this.removeBox} image={e.poster_path} name={e.original_title} discription={e.overview} rating={e.vote_average}/>
      )
    })

    //JSX goes here
    return (
      <div className="App">
          <div className="container">
            <Plus change={this.handleChange} click={this.handleClick}/>
            {movies.reverse()}
          </div>
      </div>
    );
  }
}

export default App;