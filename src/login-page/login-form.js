import React from 'react'

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            login: '',
            password: '',
            innerError: ''
        };
    this.handleInputChange = this.handleInputChange.bind(this);
     this.handleSubmit = this.handleSubmit.bind(this);
    }
     handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
  }
  handleSubmit(e){
    e.preventDefault()
    if(this.state.login !="" && this.state.password != ""){
          this.props.submitter({login: this.state.login, password: this.state.password});
    }
    else{
        this.setState({
            innerError: "All fields are required"
        })
    }
      
    
   
    

  }
    render(){
        return (
            <div>
             
                <form  onSubmit={this.handleSubmit}>
                   
                
                    <input type="email" name="login" onChange={this.handleInputChange} value={this.state.login} placeholder="email" className="form-control input-lg"/>
                            
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="password"  className="form-control input-lg"/>
                        
                            {
                                this.props.loginErr !== undefined &&
                                this.props.loginErr.length != 0 &&
                                this.props.loginErr.map((err, index)=>{
                                    return <div className="error-message" key={index}>{err}</div>
                                })
                            }
                            {
                                this.props.passwordErr !== undefined &&
                                this.props.passwordErr.length != 0 &&
                                this.props.passwordErr.map((err, index)=>{
                                    return <div className="error-message" key={index}>{err}</div>
                                })
                            }
                            {
                              
                                this.state.innerError != "" &&
                                <div className="error-message">{this.state.innerError}</div>
                            }
                    <button type="submit" className="btn btn-dark btn-lg">Log In</button>
                    
                </form>
           </div>
        )
    }
}
export default LoginForm