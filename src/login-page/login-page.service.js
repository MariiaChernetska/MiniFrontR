import axios from 'axios'
import GV from '../shared/global-vars'

class LoginPageService{
    
    static loginUser(loginObj){
        return axios.post(GV.apiHost+'/token', loginObj)
    }
  
    
}

module.exports = LoginPageService