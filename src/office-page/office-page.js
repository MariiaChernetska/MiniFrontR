import React from 'react'
import axios from 'axios'
import GV from '../shared/global-vars'
import '../scss/main.scss'
import cookie from 'react-cookie';
import VideoCard from '../shared/video-card'
import OfficeForm from './office-form'
 
class OfficePage extends React.Component{
    constructor(props) {
    super(props);   
     this.state = {
       
        pageNum: 1,
        userVideos: [],
        owlInstance: null,
        loadMore: false
     
    };
    this.renderNewVideo = this.renderNewVideo.bind(this)
    this.loadMore = this.loadMore.bind(this);
}


    componentDidMount(){
        var myThis = this;
          this.getVideos(this.state.pageNum).then(function(res){

              myThis.setState({
                  userVideos: res.data,
                  pageNum: myThis.state.pageNum+1
              })
              if(myThis.state.userVideos.length===4){
                    myThis.state.loadMore = true;
                }
              myThis.owlL();

          });
    }
    getVideos(pageNum){
       
          return  axios.get(GV.apiHost + '/videos/office/page/'+ pageNum);
    }
    loadMore(){
         var myThis = this;
         this.getVideos(this.state.pageNum).then((res)=>{
            var buf = myThis.state.userVideos
            myThis.setState({
                  userVideos: buf.concat(res.data),
                  pageNum: myThis.state.pageNum+1
              });
              myThis.state.owlInstance.owlCarousel('destroy');
            setTimeout(() => myThis.owlRefresh(position), 2);

         });
        
         var position = null;
         (this.state.userVideos.length%4==0)? position=this.state.userVideos.length/4:position=Math.floor(this.state.userVideos.length/4)-1;
       
      
        
    }
    renderNewVideo(newVideo){
        var buf = this.state.userVideos;
        buf.unshift(newVideo)
        buf.pop()
        this.setState({
            userVideos: buf
        })
       
         this.state.owlInstance.owlCarousel('destroy');
            setTimeout(() => this.owlRefresh(1), 2);
    }

    render(){
        return(
         <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="carousel-height">
                        <div className="owl-carousel owl-theme" ref="owl">
                            {
                      this.state.userVideos.map((video, index)=>{
                        return <VideoCard video={video} key={index}/>
                      })
                    }
                        </div>
                    </div>
                </div>
                {
                    this.state.loadMore &&
                        <button className="btn btn-dark top20" onClick={this.loadMore}  type="button">Load more</button>
                    
                }
            </div>
            
            <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
                <OfficeForm getSavedVideo={this.renderNewVideo}/>
            </div>
        </div>
               </div>
        
        )
    }
owlRefresh(length){
 
  this.setState({owlInstance : $(this.refs.owl).owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
});
this.state.owlInstance.trigger('to.owl.carousel', [length]);


}

owlL(){
   this.setState({owlInstance: $(this.refs.owl).owlCarousel({
    loop:false,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:4
        }
    }
})
        })
    }
}

export default OfficePage