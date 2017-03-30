import React from 'react'
import axios from 'axios'
import GV from './shared/global-vars'
import './scss/main.scss'
import cookie from 'react-cookie';

class PlayerPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            video: {
                title: '',
                description: '',
                dateAdded: '',
                path: '',
                screenShot: '',
                userName: ''
            }
        }
    }
    componentDidMount(){
        var myThis = this;
        this.getVideo(this.props.location.query.id).then((res)=>{
            myThis.setState({
                video: res.data
            })
        })
        console.log(this.props.location.query.id)
    }
    getVideo(id){
        return axios.get(GV.apiHost+'/videos/player/'+ id)
    }
    render(){
        return(
            <div className="container">
                 <div className="row">
        <div className="col-sm-8 col-sm-offset-2">
            {
                this.state.video.path !== undefined &&
                <video className="video-player" height="300" controls="controls" poster={GV.apiHost+this.state.video.screenShot}>
                <source src={GV.apiHost+this.state.video.path}/>
            </video>
            }
            
            <h4 className="video-title">{this.state.video.title}</h4>
            <p className="video-descr">{this.state.video.description}</p>
            
            <div className="col-sm-4">
                {this.state.video.dateAdded}
            </div>
            <div className="col-sm-4">
                <p className="author pull-right">Added by: {this.state.video.userName}}</p>

            </div>

        </div>

    </div>
            </div>


        );
    }
}
export default PlayerPage;