import React, { Component } from 'react';

class Box extends Component {

    render(){
        return (
            <div className="box">
                <button onClick={()=> this.props.remove(this.props.index)} className="remove">+</button>
                <img id="poster" src={`https://image.tmdb.org/t/p/w500/${this.props.image}`} alt="movie poster"/>
                <button onClick={()=> this.props.left(this.props.index) } className="left_arrow">^</button>
                <button onClick={()=> this.props.right(this.props.index)} className="right_arrow">^</button>
                <p>{this.props.discription}</p>
                
            </div>
        )
    }
}

export default Box;