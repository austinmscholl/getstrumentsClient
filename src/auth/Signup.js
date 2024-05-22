import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import APIURL from '../helpers/environment';

const Signup = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            alert('Email is required');
            return;
        }

        fetch(`${APIURL}/api/signup`, {
            method: 'POST',
            body: JSON.stringify({ user: { email, password } }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(response => response.json())
            .then(data => {
                setToken(data.sessionToken);
            });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                        id="su_password"
                        type="password"
                        minLength="8"
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

export default Signup;
