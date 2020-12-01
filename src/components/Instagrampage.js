import React, { Component } from 'react'
import User from './User'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useHistory,
    useLocation
  } from "react-router-dom";
import {ClipLoader, SyncLoader} from "react-spinners/";
import { css } from "@emotion/core";
import {connect} from 'react-redux';
import {loginUser} from '../actions';


const axios = require('axios');
const baseUrl =  'https://instagramserv.herokuapp.com/'; // 'http://127.0.0.1:3000/' 

export class Instagrampage extends Component {
    constructor(props) {
        super(props);
        this.state = {username:'',password:'',loader:false, error:''};
      }

    UNSAFE_componentWillMount()
    {
        this.onInstaLogin();
    }

    async onLogin()
    {
        this.setState({loader:true,error:''});
        const{ username,password} = this.state;
        var postParams = 
        {
            'userName': username.toString(),
            'password': password.toString()
        };
        await axios.post(baseUrl+'api/v1/login',postParams,{headers:{'Content-Type':'application/json','Access-Control-Allow-Origin': '*'}})
          .then( (response)=> {
            if(response.status == 200 && response.statusText === 'OK')
            {
                this.setState({response:response.data});
                this.props.loginUser(response.data.user);
                
            }else
            {
                if(response.data.message)
                {
                    this.setState({error:response.data.message});
                }
            }
          })
          .catch(function (error) {
            console.log("api call error : ",error);
          });
          this.setState({loader:false});
    }

    onInstaLogin()
    {
        if(this.state.loader)
        {
            return(
                <div className="sweet-loading">
                    <SyncLoader
                    css={override}
                    size={5}
                    color={"#3897f0"}
                    loading={true}
                    />
                </div>
            );
        }
        else
        {
            return(<button className="login-button" title="login" onClick={this.onLogin.bind(this)} >Log In</button>);
        }
    }
    
    renderScreen()
    {
        if(this.props.Mode.login)
        {
            return(
                <div>
                    <Router>
                            <Switch>
                                <Route path="/user" exact component={User}/>
                            </Switch>
                        </Router>
                        <Redirect to='/user'/>
                </div>
                );
        }
        else
        {
            return(<div className="container">
            <div className="box">
                <div className="heading"></div>
                <form className="login-form" action="javascript:void(0);" method="GET">
                    <div className="field">
                        <input id="username" type="name" placeholder="Phone number, username, or email" onChange={(e)=>{this.setState({username:e.target.value})}}/>
                        <label for="username">Phone number, username, or email</label>
                    </div>
                    <div className="field">
                        <input id="password" type="password" placeholder="password" onChange={(e)=>{this.setState({password:e.target.value})}}/>
                        <label for="password">Password</label>
                    </div>

                   {this.onInstaLogin()}

                    <div className="separator">
                        <div className="line"></div>
                        <p><b>OR</b></p>
                        <div className="line"></div>
                    </div>
                    <div className="other">
                        <button className="fb-login-btn" type="button">
                            <i className="fa fa-facebook-official fb-icon"></i>
                            &nbsp;
                            <span className="">Log in with Facebook</span>
                        </button>
                        <a className="forgot-password" href="#">Forgot password?</a>
                        <p style={{color:'red',fontSize:15}}>{this.state.error}</p>
                    </div>
                </form>
            </div>
            <div className="box">
                <p>Don't have an account? <a className="signup" href="#">Sign Up</a></p>
            </div>
        </div>
        );
        }
    }
    render() {

        return (
        <div>
            {this.renderScreen()}
        </div>
        )
    }
}

const override = css`
  display: block;
  margin: 0 auto;
  text-align: center;
`;

const mapStateToProps = state =>
{
  const {Mode} = state;
  return ({Mode});
};

export default connect(mapStateToProps,{loginUser}) (Instagrampage);
