const axios = require('axios')
const config = require('./config'); //DO NOT LEAVE THIS HERE
let user_input = "The Dark knight"

let movieList= [ 
    
 ]

 Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this
  }

// axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${user_input}&page=1&include_adult=false`).then( response => console.log(response.data.results[0]) )

// axios.get("https://api.themoviedb.org/3/movie/327?api_key=d194aa456eb6c0b417f1a517afb41f31").then( response => console.log(response.data) )

 module.exports = {
     read: ( req, res ) => {
         res.status(200).send(movieList)
     },
     create: ( req, res ) => {
         console.log(req.body.user_input)
         user_input = req.body.user_input
         axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${config.movieDBKey}&language=en-US&query=${user_input}&page=1&include_adult=false`)
              .then( response => { 
                movieList.push(response.data.results[0])
                console.log("FROM SERVER, the movie list length is " + movieList.length);
                // res.status(200).send(response.data.results[0])
                res.status(200).send(movieList[movieList.length-1])
             })
     },
     update: ( req, res ) => {

        let index = req.params.id;

        // console.log(index);

        // let temp = movieList[index+1];

        // movieList[index+1] = movieList[index];

        // movieList[index] = temp;

        // res.status(200).send('working!!!')

        // let index = req.params.id;
        // let temp = movieList[index + 1];
        // movieList[index+1] = movieList[index];
        // movieList[index+1];
        // movieList[index] = temp;
        
        movieList = movieList.swap(index, index + 1);
        res.status(200).send(movieList);
     },
     delete: ( req, res ) => {
        let index = req.params.id
        movieList.splice(index,1);
        console.log("movie length after element is removed is " + movieList.length);
        res.status(200).send("here ya go")
     }
 }
