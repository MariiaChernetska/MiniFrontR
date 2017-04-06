import React from 'react'
import '../scss/main.scss'
import axios from 'axios'
import cookie from 'react-cookie';
import LoginPageService from './login-page.service'
import LoginForm from './login-form'
class LoginPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
                email: '',
                password: '',
                errors: {
                    login:[],
                    passord:[]
                },
                errorLogin: [],
                errorPassword: []
            };
    
        this.redirectToOffice = this.redirectToOffice.bind(this);
        this.sendData = this.sendData.bind(this);
      
    }
    redirectToOffice() {
        this.context.router.transitionTo('/office')
        console.log(this.context)
    }
    sendData(formData){
        var sendObj = {
           login: formData.login,
           password: formData.password,
       }
       var myThis = this; 
        LoginPageService.loginUser(sendObj).then(function(res){
            cookie.save('authorizationData',  { token: res.data.token, userName: res.data.userName }, { path: '/' });
        
            myThis.props.loginer(true)
            myThis.redirectToOffice();
         
       }).catch(function (error) {
           if(error.response){
             myThis.setState({
                
                    errorLogin: error.response.data.modelState['user.Login'],
                    errorPassword: error.response.data.modelState['user.Password']
                
            })
           }
           console.log(error.response)
          
       });
    }
    render(){
        return(
        <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
                <LoginForm submitter={this.sendData} loginErr={this.state.errorLogin} passwordErr={this.state.errorPassword}/>
        </div>
         </div>
        )
    }
}
LoginPage.contextTypes = {
  router: React.PropTypes.object
};
export default LoginPage