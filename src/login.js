import React from 'react'
import axios from 'axios'
import GV from './shared/global-vars'
import './scss/main.scss'
import cookie from 'react-cookie';

class LoginPage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
     
    };
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToOffice = this.redirectToOffice.bind(this);

}
redirectToOffice() {
    this.context.router.transitionTo('/office')
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
           password: this.state.password,
       }
       axios.post(GV.apiHost+'/token', sendObj).then(function(res){
            cookie.save('authorizationData',  { token: res.data.token, userName: res.data.userName }, { path: '/' });
            myThis.redirectToOffice();
           console.log(cookie.load('authorizationData'));
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
                    <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    <button type="submit" className="btn btn-dark btn-lg" >Log In</button>


                </form>
        </div>
         </div>
        )
    }
}
LoginPage.contextTypes = {
  router: React.PropTypes.object
};
export default LoginPage