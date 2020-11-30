import Instagrampage from './components/Instagrampage.js';
import User from './components/User.js';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../src/actions';

class App extends Component{
  constructor(props)
  {
    super(props);
    this.state = {userData:{}};
  }
  renderUser()
  {
    if(this.props.Mode.login)
    {
      return(<Route path="/user" exact component={User}/>);
    }
  }

  render()
  {
    return (
        <div>
          <Router>
            <Switch>
                <Route exact path="/" component={Instagrampage}/>
                {this.renderUser()}
            </Switch>
          </Router>
        </div>
  );
  }
}
const mapStateToProps = state =>
{
  const {Mode} = state;
  return ({Mode});
};
export default connect(mapStateToProps,{loginUser})(App);
