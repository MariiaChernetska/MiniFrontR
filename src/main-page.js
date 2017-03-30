import React from 'react'
import './scss/main.scss'
import axios from 'axios'
import VideoCard from './shared/video-card'
import GV from './shared/global-vars'

var sortBy = {
        rate: 0,
        date: 1
}
var sortType={
        asc: 0,
        desc: 1
}
function paramsData(){
        this.pageNumber = 1;
        this.orderBy = "";
        this.order = "";
      }

class MainPage  extends React.Component{
      dick = new paramsData();
      constructor (props) {
        super(props);
         this.state = { 
           videoRes: {pageNum: 1, pagesAmount: 1, videosArray:[]},
           pageNum: 1,
           orderBy: sortBy.date,
           order: sortType.desc,
           pagesArray: [],
            from: 0,
            to: 0,
            showPagination: false

          };
        this.sortByRating = this.sortByRating.bind(this)
        this.sortByDate = this.sortByDate.bind(this)

    }


      componentDidMount () {
        this.sortByDate();
      }


    sortByDate(){
      var myThis = this;
        this.setState({
            pageNum: 1
          })
          if(myThis.state.orderBy == sortBy.date){
           
            if(myThis.state.order == sortType.asc){
                myThis.setState({
                  order: sortType.desc
                })
            }
            else{
               myThis.setState({
                  order: sortType.asc
                })
            }
          }
          else{
            myThis.setState({
              orderBy: sortBy.date,
              order: sortType.desc
            })
        
          }
           this.loadData()
      }

      sortByRating(){
        var myThis = this;
          this.setState({
            pageNum: 1
          })
          if(myThis.state.orderBy == sortBy.rate){
              if(myThis.state.order == sortType.asc){
                myThis.setState({
                  order: sortType.desc
                })
            }
            else{
               myThis.setState({
                  order: sortType.asc
                })
            }
          }
          else{
            myThis.setState(function(prevState){
              return {
                orderBy: !prevState.orderBy
              }
            })
          
          this.loadData();
      }
      }





       getVideos(paramsObj){
          
          return axios.get(GV.apiHost + `/videos/page/`+paramsObj.pageNumber, {params: {orderBy: paramsObj.orderBy, order: paramsObj.order}});
      }

      loadData(){
        var paramsObj = new paramsData();
        switch(this.state.orderBy){
        case sortBy.date: 
              paramsObj.orderBy = "date";
              break;
        case sortBy.rate:
              paramsObj.orderBy = "rate";
              break;
      }
       switch(this.state.order){
        case sortType.asc: 
              paramsObj.order = "asc";
              break;
        case sortType.desc:
              paramsObj.order = "desc";
              break;
      }
      paramsObj.pageNumber = this.state.pageNum;
      var myThis = this;
      console.log(paramsObj)
        this.getVideos(paramsObj).then((res)=>{
            myThis.setState({
                videoRes: res.data
            })
            console.log(res.data)
    }).catch((error)=>{
        console.log(error)
    });
}

     
      












      




      setNum(num){
            this.state.pageNum = num;
            this.loadData();
      }


    
    




      render(){ 


              return(
                  <div>
                    <div className="row">
        <div className="col-xs-12">
            <div className="pull-right sorting-bar">
                Sort by:
                <span onClick={this.sortByRating}>rating</span> |
                <span onClick={this.sortByDate}>date</span>
            </div>
        </div>
    </div>



                    {
                      this.state.videoRes.videosArray.map((video, index)=>{
                        return <div className="col-sm-3" key={index}><VideoCard video={video} key={index}/></div>
                      })
                    }

                 
                    
          
                </div>
              
              )
          }
}

export default MainPage