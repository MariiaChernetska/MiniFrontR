import axios from 'axios'
import GV from '../shared/global-vars'

class MainPageService{
    static getVideos(paramsObj){
          
          return axios.get(GV.apiHost + `/videos/page/`+paramsObj.pageNumber, {params: {orderBy: paramsObj.orderBy, order: paramsObj.order}});
      }
}

module.exports = MainPageService