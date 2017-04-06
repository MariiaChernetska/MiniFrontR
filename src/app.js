import React from 'react';
import { render } from 'react-dom';
import MainPage from './main-page/main-page'
import RegistrationPage from './reg-page/reg-page'
import LoginPage from './login-page/login-page'
import OfficePage from './office-page/office-page'
import PlayerPage from './player-page/player-page'
import { HashRouter, Route, Match } from 'react-router';
import { Link } from 'react-router';
import cookie from 'react-cookie';
import axios from 'axios';
import GV from './shared/global-vars'
class App extends React.Component{
    
    constructor(props){
        super(props)
        this.checkLogin()
        this.state = {
            isLogined: false
        }
        this.signOut = this.signOut.bind(this);
        this.setLoginState = this.setLoginState.bind(this);
       
    }
   
    checkLogin(){
        var authData = cookie.load('authorizationData');
        if(authData && authData.token){
               axios.get(GV.apiHost+'/primarylogin',{headers:{'Authorization': `Basic ${authData.token}`} }).then((res)=>{
           this.setState({
                isLogined: true
           })
        }).catch((error)=>{
            console.log(error.response)
        })
        }
    }
    signOut(){
        cookie.remove('authorizationData');
        this.setLoginState(false)
    }
    setLoginState(loginState){
        this.setState({
            isLogined: loginState
        })
    }

    render() {
        return ( 
            <HashRouter>
               <div>
                   <nav className="menu">
                        <div className="container">
                            <a href="" className="brand">MiniUtube</a>
                            {
                                !this.state.isLogined &&
                                <ul>
                                    <li>
                                        <Link to='/login'>Sign In</Link>
                                    </li>
                                    <li>
                                        <Link to='/register'>Sign Up</Link>
                                    </li>
                                </ul>
                            }
                            
                                {
                                    this.state.isLogined &&
                                    <ul>
                                        <li>
                                            <Link to='/office'>Office</Link>
                                        </li>
                                        <li>
                                            <Link to='/' onClick={this.signOut}>Sign Out</Link>

                                        
                                        </li>
                                    </ul>
                                }
                        </div>
                    </nav>
                    <div className="container">
                        <Match exactly pattern="/" component={MainPage} />
                        <Match  pattern="/register" component={RegistrationPage}/>
                        <Match  pattern="/login" component={(props)=><LoginPage loginer={this.setLoginState}/>} />
                        <Match  pattern="/office" component={OfficePage}/>
                        <Match  pattern="/player"   render={(props) => <PlayerPage isLogined={this.state.isLogined} {...props} />}/>
                  
                    </div>
              </div>
            </HashRouter>
        );
    }
};
App.contextTypes = {
  history: React.PropTypes.object
};

render( <App /> , document.getElementById('app'))