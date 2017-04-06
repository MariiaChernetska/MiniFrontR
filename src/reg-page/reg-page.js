import React from 'react'
import '../scss/main.scss'
import RegPageService from './reg-page.service'
import RegForm from './reg-form'
class RegistrationPage extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullName: '',
      password: '',
      repeatPassword: '',
      loginError: [],
      fullNameError: [],
      passwordError: [],
      repeatPasswordError: [], 
    };
    this.redirectToLogin = this.redirectToLogin.bind(this);
    this.regService = new RegPageService();
    this.sendData = this.sendData.bind(this);
};
    redirectToLogin() {
        this.context.router.transitionTo('/login')
    }
    sendData(formData){
         var sendObj = {
           login: formData.login,
           fullName: formData.fullName,
           password: formData.password,
           repeatPassword: formData.password
       }
       var myThis = this;
         this.regService.regUser(sendObj).then(function(res){
            myThis.redirectToLogin();
       }).catch(function (error) {
            myThis.setState({
                loginError: error.response.data.modelState['user.Login'],
                fullNameError: error.response.data.modelState['user.FullName'] != undefined ? error.response.data.modelState['user.FullName'] : [],
                passwordError: error.response.data.modelState['user.Password'] != undefined ? error.response.data.modelState['user.Password'] : [],
                repeatPasswordError: error.response.data.modelState['user.ConfirmPassword'] != undefined ? error.response.data.modelState['user.ConfirmPassword'] : [],
            })
        });
    }
    render(){
        return(
        <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
                <RegForm submitter={this.sendData} 
                        serverLoginError={this.state.loginError}
                        serverFullNameError={this.state.fullNameError}
                        serverPasswordError={this.state.passwordError}
                        serverRepeatPasswordError={this.state.repeatPasswordError}/>      
            </div>
         </div>
        )
    }
}
RegistrationPage.contextTypes = {
  router: React.PropTypes.object
};
export default RegistrationPage