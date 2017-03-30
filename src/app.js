import React from 'react';
import { render } from 'react-dom';
import MainPage from './main-page'
import RegistrationPage from './registration'
import LoginPage from './login'
import OfficePage from './office'
import PlayerPage from './player'
import { HashRouter, Match } from 'react-router';
import { Link } from 'react-router'
const App = React.createClass({
    render: function() {
        return ( 
            <HashRouter>
               <div>
                   <nav className="menu">
                        <div className="container">
                            <a href="" className="brand">MiniUtube</a>
                            <ul>
                                <li>
                                    <Link to='/login'>Sign In</Link>
                                   
                                </li>
                                <li>
                                   <Link to='/register'>Sign Up</Link>
                                </li>
                            
                            </ul>
                        </div>
                    </nav>
                  


                    <div className="container">

                  
                <Match exactly pattern="/" component={MainPage}/>
              <Match  pattern="/register" component={RegistrationPage}/>
              <Match  pattern="/login" component={LoginPage}/>
              <Match  pattern="/office" component={OfficePage}/>
              <Match  pattern="/player" component={PlayerPage}/>
                </div>
              </div>
            </HashRouter>
        );
    }
});

render( <App /> , document.getElementById('app'))