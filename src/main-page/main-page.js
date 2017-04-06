import React from 'react'
import '../scss/main.scss'
import VideoCard from '../shared/video-card'
import MainPageService from './main-page.service'

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
        this.p = new paramsData()
    }
      
      componentDidMount () {
        this.sortByDate();
      }


    sortByDate(){
      var myThis = this;
        this.setState({
            pageNum: 1
          })
          if(myThis.p.orderBy == sortBy.date){
           
            myThis.p.order = myThis.p.order == sortType.asc ? sortType.desc:sortType.asc

          }
          else{
            myThis.p.orderBy = sortBy.date;
             myThis.p.order = sortType.desc;
          }
           this.p.pageNumber = 1
           this.loadData()
      }

      sortByRating(){
        var myThis = this;
          this.setState({
            pageNum: 1
          })
          if(myThis.p.orderBy == sortBy.rate){

            myThis.p.order = myThis.p.order == sortType.asc ? sortType.desc:sortType.asc
              
          }
          else{
            myThis.p.orderBy = sortBy.rate
             myThis.p.order = sortType.desc;
          
         
      }
      this.p.pageNumber = 1
       this.loadData();
      }





       /*getVideos(paramsObj){
          
          return axios.get(GV.apiHost + `/videos/page/`+paramsObj.pageNumber, {params: {orderBy: paramsObj.orderBy, order: paramsObj.order}});
      }*/

      loadData(){
        var paramsObj = new paramsData();
        switch(this.p.orderBy){
        case sortBy.date: 
              paramsObj.orderBy = "date";
              break;
        case sortBy.rate:
              paramsObj.orderBy = "rate";
              break;
      }
       switch(this.p.order){
        case sortType.asc: 
              paramsObj.order = "asc";
              break;
        case sortType.desc:
              paramsObj.order = "desc";
              break;
      }
      paramsObj.pageNumber = this.p.pageNumber;
      var myThis = this;
      console.log(paramsObj)
        MainPageService.getVideos(paramsObj).then((res)=>{
            let from = res.data.pageNum-res.data.pageNum%10;
            let fromState = ((res.data.pageNum%10) == 0 ? from-10 : from)+1
            myThis.setState({
                videoRes: res.data,
                from: fromState,
                to: fromState+9
            })
              
        
     
        if(this.state.to>res.data.pagesAmount){
          myThis.setState({
            to: res.data.pagesAmount
          })
        }
        
        var pagesArray = [];
        for(let i = this.state.from; i <= this.state.to; i++){
          pagesArray.push(i);
        }
         myThis.setState({
            pagesArray: pagesArray
          })
        
        if(res.pagesAmount>1){
           
            myThis.setState({
            showPagination: true
          })
        }



            console.log(res.data)
    }).catch((error)=>{
        console.log(error)
    });
}

     
      












      




      setNum(num){
            this.p.pageNumber = num;
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

                   <div className="row">
        <div className="col-sm-12">
            <nav aria-label="Page navigation" className="paginator">
                <ul className="pagination">
                    <li>
                        <a aria-label="First" onClick={()=>this.setNum(this.state.from-10)}>
                            <span aria-hidden="true">First</span>
                        </a>
                    </li>
                    {
                      this.state.from !=1 &&
                        <li>
                          <a aria-label="Previous block" onClick={()=>this.setNum(this.state.from-10)}>
                              <span aria-hidden="true">{this.state.from-10}..{this.state.from-1}</span>
                          </a>
                      </li>
                    }
                    {
                       this.p.pageNumber !=1 &&
                        <li>
                          <a onClick={()=>this.setNum(this.p.pageNumber-1)} aria-label="Previous">
                              <span aria-hidden="true">&laquo;</span>
                          </a>
                        </li>
                    }
                    
                    {
                      this.state.pagesArray.map((page, index)=>{
                               return  <li onClick={()=>this.setNum(page)} key={index}>
                                          <a key={index}>{page}</a>
                                        </li>
                      })
                    }
                 
                    {
                      this.p.pageNumber != this.state.videoRes.pagesAmount &&
                        <li>
                          <a aria-label="Next" onClick={()=>this.setNum(this.p.pageNumber+1)}>
                              <span aria-hidden="true">&raquo;</span>
                          </a>
                      </li>
                    }
                    {
                      this.state.to != this.state.videoRes.pagesAmount &&
                        <li>
                            <a aria-label="Next block" onClick={()=>this.setNum(this.state.from+10)}>
                                <span aria-hidden="true">{this.state.from+10}..{this.state.to+10}</span>
                            </a>
                        </li>
                    }
                    
                      <li>
                        <a aria-label="Last" onClick={()=>this.setNum(this.state.videoRes.pagesAmount)}>
                            <span aria-hidden="true">Last</span>
                        </a>
                    </li>
                    
                    
                </ul>
            </nav>
        </div>
    </div>
                    
          
                </div>
              
              )
          }
}

export default MainPage