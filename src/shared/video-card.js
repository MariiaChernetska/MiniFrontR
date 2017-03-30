import React from 'react'
import '../scss/main.scss'
import GV from './global-vars'
import CRating from './custom-rating'
import { Link } from 'react-router'
class VideoCard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
                    <div className="one-video">

            <div className="image-block">
                <img src={GV.apiHost+this.props.video.screenShot} className="img-responsive"/>
                <div className="rate-line">
                   <span className="yellow-stars">
                       <CRating rating={this.props.video.rating} readonly={true}/>
                       </span> 
                    
                    
                   <span className="pull-right"><i className="glyphicon glyphicon-user"></i> {this.props.video.ratingsAmount}</span>

                </div>

            </div>

            <div className="descr">
                <Link className='name' to={{  pathname: '/player', query: { id: this.props.video.id } }}>
                    {this.props.video.title}
                </Link>
                <p className="author ">{this.props.video.userName}</p>
                <div className="date">{this.props.video.dateAdded}</div>
            </div>

        </div>

            
        );
    }
};

export default VideoCard;