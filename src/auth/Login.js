import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from '../helpers/environment';
import '../../src/styles.css';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('button pressed');
        fetch(`${APIURL}/api/login`, {
            method: 'POST',
            body: JSON.stringify({ user: { email, password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.sessionToken);
                setToken(data.sessionToken);
                localStorage.setItem('token', data.sessionToken);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="li_email">Email</Label>
                    <Input
                        id="li_email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="li_password">Password</Label>
                    <Input
                        id="li_password"
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default Login;
