import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import './auth.css';


const Auth = (props) => {
    return (
        <div className="color">
            <h4 className="welcome">Welcome to Getstruments</h4>
            <h5 className="welcome">Resource-sharing for Local Musicians</h5>
            <Container className="auth-container">
                <Row>
                    <Col md="6">
                        <Signup setToken={props.setToken} />
                    </Col>
                    <Col md="6" className="login-col">
                        <Login setToken={props.setToken} />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Auth;