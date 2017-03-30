import React from 'react'
import axios from 'axios'
import GV from './shared/global-vars'
import './scss/main.scss'

class RegistrationPage extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullName: '',
      password: '',
      repeatPassword: ''
    };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);

    
    
};
redirectToLogin() {
    this.context.router.transitionTo('/login')
  }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
  }
  
  handleSubmit(event){
       event.preventDefault();
        var myThis = this;
       var sendObj = {
           login: this.state.email,
           fullName: this.state.fullName,
           password: this.state.password,
           repeatPassword: this.state.password
       }
      
       axios.post(GV.apiHost+'/register', sendObj).then(function(res){
            myThis.redirectToLogin();

       }).catch(function (error) {
            console.log(error);
        });
  }


    render(){
        
        return(
        <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
                <form  onSubmit={this.handleSubmit}>
                    <input type="email" name="email" value={this.state.email} placeholder="email" onChange={this.handleInputChange} className="form-control input-lg"/>
                    <input type="text" name="fullName" value={this.state.fullName} placeholder="full name" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    <input type="password" name="repeatPassword" value={this.state.repeatPassword} placeholder="repeat password" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    <button type="submit" className="btn btn-dark btn-lg" >Register</button>


                </form>
        </div>
         </div>
        )
    }
}
RegistrationPage.contextTypes = {
  router: React.PropTypes.object
};
export default RegistrationPage