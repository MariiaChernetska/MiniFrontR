import React from 'react'

class RegForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login: '',
            fullName:'',
            password: '',
            repeatPassword: '',
            loginError: '',
            fullNameError: '',
            passwordError: '',
            repeatPasswordError: '',
            
        }
     this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
     this.formErrorsState = {
         login: '',
         fullName: '',
         password: '',
         repeatPassword: '',
         isValid: function(mythis){
            if(!mythis.repeatPasswordValidation(mythis.state.password, mythis.state.repeatPassword) 
                && !mythis.loginValidation(mythis.state.login) 
                    && !mythis.passwordValidation(mythis.state.password)
                    && !mythis.fullNameValidation(mythis.state.fullName)){
                         return false;
            }
            return true
         }
     }
    }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    switch (name){
            case "login": this.loginValidation(value); break;
            case "fullName": this.fullNameValidation(value); break;
            case "password": this.passwordValidation(value); break;
            case "repeatPassword": this.repeatPasswordValidation(value, this.state.password); break;
    }
    this.setState({
        [name]: value
    });
  }
  handleSubmit(e){
      e.preventDefault();
        if(!this.formErrorsState.isValid(this)) return
            this.props.submitter({
                login: this.state.login, 
                fullName: this.state.fullName, 
                password: this.state.password,
                repeatPassword: this.state.repeatPassword
            });
}
    repeatPasswordValidation(password, repeatPassword){
        if(this.passwordMatching(password, repeatPassword)){
            this.formErrorsState.repeatPassword = "";
            this.setState({
                repeatPasswordError: this.formErrorsState.repeatPassword
            });
            return true
        }
        else{
            this.formErrorsState.repeatPassword = "Passwords do not match";
            this.setState({
                repeatPasswordError: this.formErrorsState.repeatPassword
            })
        }
            return false
    }
    passwordMatching(password, repeatPassword){
        if(password != '' && repeatPassword != '' && password === repeatPassword) return true
        return false
    }
    fullNameValidation(value){
        if(value != ""){
            this.formErrorsState.fullName = "";
            this.setState({
                fullNameError: this.formErrorsState.fullName
            });
            return true
        }
        else{
            this.formErrorsState.fullName = "Full name field is required";
            this.setState({
                fullNameError: this.formErrorsState.fullName
            })
        }
            return false
    }
    loginValidation(value){
         if(this.checkLogin(value)){
            this.formErrorsState.login = "";
            this.setState({
                loginError: this.formErrorsState.login
            });
            return true
        }
        else{
            this.formErrorsState.login = "Email address is not valid";
            this.setState({
                loginError: this.formErrorsState.login
            })
        }
            return false
    }
    passwordValidation(password){
        if(this.checkPassword(password)){
            this.formErrorsState.password = "";
            this.setState({
                passwordError: this.formErrorsState.password
            });
            return true
        }
        else{
            this.formErrorsState.password = "Password must contain minimum 6 characters: at least 1 alphabet and 1 number";
            this.setState({
                passwordError: this.formErrorsState.password
            })
        }
        return false
    }
    checkLogin(login){
         var testString = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
         return testString.test(login);
    }
    checkPassword(password){
        var testString = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/
        return testString.test(password)
    }
    render(){
        return (
            <form  onSubmit={this.handleSubmit}>
                    <input type="email" name="login" value={this.state.login} placeholder="email" onChange={this.handleInputChange} className="form-control input-lg"/>
                    {
                        this.state.loginError != "" &&
                        <div className="error-message">{this.state.loginError}</div>
                    }
                    {
                        this.props.serverLoginError.length != 0 &&
                        this.props.serverLoginError.map((err, index)=>{
                            return <div className="error-message" key={index}>{err}</div>
                        })
                    }
                    <input type="text" name="fullName" value={this.state.fullName} placeholder="full name" onChange={this.handleInputChange}  className="form-control input-lg"/>
                     {
                        this.state.fullNameError != "" &&
                        <div className="error-message">{this.state.fullNameError}</div>
                    }
                    {
                        this.props.serverFullNameError.length != 0 &&
                        this.props.serverFullNameError.map((err, index)=>{
                            return <div className="error-message" key={index}>{err}</div>
                        })
                    }
                    <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    {
                        this.state.passwordError != "" &&
                        <div className="error-message">{this.state.passwordError}</div>
                    }
                    {
                        this.props.serverPasswordError.length != 0 &&
                        this.props.serverPasswordError.map((err, index)=>{
                            return <div className="error-message" key={index}>{err}</div>
                        })
                    }
                    <input type="password" name="repeatPassword" value={this.state.repeatPassword} placeholder="repeat password" onChange={this.handleInputChange}  className="form-control input-lg"/>
                    {
                        this.state.repeatPasswordError != "" &&
                        <div className="error-message">{this.state.repeatPasswordError}</div>
                    }
                    {
                        this.props.serverRepeatPasswordError.length != 0 &&
                        this.props.serverRepeatPasswordError.map((err, index)=>{
                            return <div className="error-message" key={index}>{err}</div>
                        })
                    }
                    <button type="submit" className="btn btn-dark btn-lg">Register</button>
                </form>
        )
    }
}
export default RegForm;