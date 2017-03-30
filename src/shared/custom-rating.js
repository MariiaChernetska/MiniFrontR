import React from 'react'
import '../scss/main.scss'
import Rating from 'react-rating'

class CRating extends React.Component{
    constructor(prop){
        super(prop)
    }
    render(){
        return(
            <Rating initialRate={this.props.rating} readonly={this.props.readonly} 
                                    empty={<span className="glyphicon glyphicon-star-empty"></span>}
                                    placeholder={<span className="glyphicon glyphicon-star"></span>}
                                    full={<span className="glyphicon glyphicon-star"></span>} /> 
        );
    }
}


export default CRating