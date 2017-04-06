import axios from 'axios'
import GV from '../shared/global-vars'

class PlayerPageService{
 static getVideo(id){
        return axios.get(GV.apiHost+'/videos/player/'+ id)
    }
   static postVideoComment(data){
        return axios.post(GV.apiHost+'/videos/ratingsave', data)
    }
}

module.exports = PlayerPageService