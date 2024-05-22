import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Signup from './Signup';
import Login from './Login';
import '../../src/styles.css';

const Auth = ({ setToken }) => {
    return (
        <div className="color">
            <h4 className="welcome">Welcome to Getstruments</h4>
            <h5 className="welcome">Resource-sharing for Local Musicians</h5>
            <Container className="auth-container">
                <Row>
                    <Col md="6">
                        <Signup setToken={setToken} />
                    </Col>
                    <Col md="6" className="login-col">
                        <Login setToken={setToken} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Auth;
