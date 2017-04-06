import axios from 'axios'
import GV from '../shared/global-vars'

class RegPageService{
 regUser(sendObj){
       return axios.post(GV.apiHost+'/register', sendObj)
    }
}

module.exports = RegPageService