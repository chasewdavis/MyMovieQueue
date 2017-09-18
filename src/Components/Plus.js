import React, { Component } from 'react';
import icon from '../cinema.svg'

class Plus extends Component {

    render(){
        return (
            <div className="plus_box">
                <img id="tv_icon" src={icon} alt='movie icon'/>
                <search>
                    <input onChange={(event)=> this.props.change(event.target.value)}/>
                    <button onClick={()=> this.props.click() }>+</button>
                </search>
            </div>
        )
    }
}

export default Plus;