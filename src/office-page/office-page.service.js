import axios from 'axios'
import GV from '../shared/global-vars'

class OfficePageService{
    
    static saveVideo(data){
        return axios.post(GV.apiHost+'/videos/videosave', data)
    }
  
    
}

module.exports = OfficePageService