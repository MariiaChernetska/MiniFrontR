import React from 'react'
import axios from 'axios'
import GV from './shared/global-vars'
import './scss/main.scss'
import cookie from 'react-cookie';
import VideoCard from './shared/video-card'
  axios.interceptors.request.use(function (config) {
            var authData = cookie.load('authorizationData');
            if(authData && authData.token){
                config.headers['Authorization'] = `Basic ${authData.token}`
            }
            return config;
        }, function (error) {
            // Do something with request error 
            return Promise.reject(error);
        });

class OfficePage extends React.Component{
    constructor(props) {
    super(props);   
     this.state = {
        fileVal: '',
        titleVal: '',
        descrVal: '',
        file: '',
        pageNum: 1,
        userVideos: [],
        owlInstance: null,
        loadMore: false
     
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

    handleInputChange(event){
         const target = event.target;
        const value = target.value;
        const name = target.name;
        console.log(name+ ' '+ value)
        if(name === "fileVal"){
                let files = target.files;
                this.setState({
                file: files[0]
            })

        }
        
        this.setState({
            [name]:value
        })
        
  
}
    handleSubmit(event){
        event.preventDefault();
        var data = new FormData();
        data.append('file', this.state.file);
        data.append('title', this.state.titleVal);
        data.append('description', this.state.descrVal);
    
        axios.post(GV.apiHost+'videos/videosave', data).then(function(res){
            console.log(res)
        });
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
                <form name="form1" onSubmit={this.handleSubmit} className="video-upload-form" encType="multipart/form-data">
                    <div>
                        <input name="fileVal" value={this.state.fileVal} onChange={this.handleInputChange} type="file"   className="upload form-control input-lg"/>
                    </div>
                    <div>
                        <input name="titleVal" value={this.state.titleVal} onChange={this.handleInputChange} placeholder="title" className="upload form-control input-lg" type="text"/>
                    </div>
                    <div>
                        <textarea name="descrVal" value={this.state.descrVal} onChange={this.handleInputChange} placeholder="description" className="upload form-control input-lg"/>
                    </div>
                    <div>
                        <button className="btn btn-dark top20"  type="submit">Save</button>
                    </div>
                </form>
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