import React from 'react'
import '../scss/main.scss'
import cookie from 'react-cookie'
import PlayerPageService from './player-page.service'
import Player from './video-player'
import CRating from '../shared/custom-rating'
import FeedbackForm from './feedback-form'

class PlayerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            video: {},
             ratings: []
        }
       this.getOneVideo = this.getOneVideo.bind(this)
    }
    
    componentDidMount(){
       this.getOneVideo();
        
    }
    getOneVideo(){
        var myThis = this;
        PlayerPageService.getVideo(myThis.props.location.query.id).then((res)=>{
            myThis.setState({
                video: res.data,
                ratings: res.data.ratings
            })
         
        })
    }
    
    render(){
        return(
            <div className="container">
                 <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <Player video={this.state.video}/>
                    </div>

                </div>
                 <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <FeedbackForm id={this.state.video.id} getNewVideo={this.getOneVideo} isLogined={this.props.isLogined}/>
                    </div>
                </div>
                 <div className="row top20">
                    <div className="col-sm-6 col-sm-offset-3">
                        {
                            this.state.ratings.map((rating, index)=>{
                                return (
                                     <div className="panel panel-default" key={index}>
                                        <div className="panel-body">
                                            {rating.comment}
                                        </div>
                                        <div className="panel-footer comment-footer">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    {rating.userName}
                                                </div>
                                                <div className="col-sm-6 text-right ">
                                                     <CRating rating={rating.rating} readonly={true}/>
                                                </div>

                                            </div>
                                            
                                           

                                        </div>
                                    </div>
                                )
                            })
                        }
                       
                    </div>
                </div>
            </div>


        );
    }
}
PlayerPage.contextTypes = {
    location: React.PropTypes.object
 }
export default PlayerPage;