import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Iframe from 'react-iframe';
import {connect} from 'react-redux';
class User extends React.Component
{
    render()
    {
        console.log("props:",this.props);
        return(
        <Container fluid style={{padding:'0px', backgroundColor:'#000'}}>
            <Row>
                <Col style={{display:'grid', gridAutoRows: 'max-content'}}>
                    
                    <a className="menuInner" href="#">{this.props.User.userData.username}</a>
                    <a className="menuInner" href="#">{this.props.User.userData.first_name}</a>
                    <a className="menuInner" href="#">{this.props.User.userData.birthday}</a>
                    <a className="menuInner" href="#">{this.props.User.userData.email}</a>
                </Col>
            
                <Col xs={9} style={{width:'100%',height:'100%', padding:'0px'}}>
                <Iframe url="https://www.actiongame.com/"
                        width="100%"
                        height="1000px"
                        id="myId"
                        display="initial"/>
                </Col>
            </Row>
        </Container>);
    }
}
const mapStateToProps = state =>
{
  console.log("mapStateToProps",state);
  return ({User: state.Mode.loginData});
};

export default connect(mapStateToProps)(User);