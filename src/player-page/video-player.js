import React from 'react'
import GV from '../shared/global-vars'
import CRating from '../shared/custom-rating'

class Player extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
       
        return(
             <div>
            {
                
                <video className="video-player" height="300" controls="controls" 
                    src={GV.apiHost+this.props.video.path}
                    poster={GV.apiHost+this.props.video.screenShot}>
               
                </video>
            }
          
            
            
            <h4 className="video-title">{this.props.video.title}</h4>
            <p className="video-descr">{this.props.video.description}</p>
            
            <div className="col-sm-4">
                {this.props.video.dateAdded}
            </div>
            <div className="col-sm-4 text-center">
                <CRating rating={this.props.video.rating} readonly={true}/>
            </div>
            
            <div className="col-sm-4">
                <p className="author pull-right">Added by: {this.props.video.userName}</p>
            </div>
            


        </div>)
    }
}
export default Player