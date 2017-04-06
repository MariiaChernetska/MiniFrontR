import React from 'react'
import Rating from 'react-rating'
import ReactStars from 'react-stars'
import PlayerPageService from './player-page.service'
import axios from 'axios'
import cookie from 'react-cookie';
import LoginPageService from '../login-page/login-page.service'
axios.interceptors.request.use(function (config) {
            var authData = cookie.load('authorizationData');
            if(authData && authData.token){
                config.headers['Authorization'] = `Basic ${authData.token}`
            }
            return config;
        }, function (error) {
            
            return Promise.reject(error);
});

class FeedbackForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            rate: 0,
            comment: ''
        };
    this.videoRating = 0;
    this.ratingChanged = this.ratingChanged.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }
     handleInputChange(event) {
        this.setState({
            comment: event.target.value
    })
  }
  handleSubmit(e){
    e.preventDefault()
    if(this.state.comment !="" || this.videoRating == 0){
          PlayerPageService.postVideoComment(
              {
                'comment': this.state.comment,
                'rating': this.videoRating,
                'videoId': this.props.id
            })
            this.props.getNewVideo();
        }
    else{
        this.setState({
            innerError: "All fields are required"
        })
    }

  }

     ratingChanged(newRating){
        this.videoRating = newRating;
    }
    render(){
        return (
            <div>
                {
                  this.props.isLogined &&
                    <form  onSubmit={this.handleSubmit}>
                        <div className="leaveRating">
                            <ReactStars count={5} onChange={this.ratingChanged} size={36} color2={'#ffd700'} half={false}/>
                        </div>
                        <textarea name="rate" value={this.state.comment} onChange={this.handleInputChange}
                                    placeholder="description" className="upload form-control input-lg"/>
                        <button type="submit" className="btn btn-dark btn-lg">Submit</button>
                    </form>
                }
           </div>
        )
    }
}
export default FeedbackForm