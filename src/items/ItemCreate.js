import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../../src/styles.css';
import APIURL from '../helpers/environment';

const ItemCreate = ({ token, updateItemsArray }) => {
    const [item, setItem] = useState({
        id: '',
        type: '',
        brand: '',
        model: '',
        notes: '',
        location: '',
        owner: '',
        availability: false,
        rating: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleCheckBox = (e) => {
        const { checked } = e.target;
        setItem((prevItem) => ({
            ...prevItem,
            availability: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/items`, {
            method: 'POST',
            body: JSON.stringify({ item }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token
            })
        })
        .then((res) => res.json())
        .then(() => {
            updateItemsArray();
            setItem({
                id: '',
                type: '',
                brand: '',
                model: '',
                notes: '',
                location: '',
                owner: '',
                availability: false,
                rating: ''
            });
        });
    };

    return (
        <div>
            <h3>List an Instrument</h3>
            <hr />
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="type">Type</Label>
                    <Input type="select" name="type" id="type" value={item.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Electric Guitar">Electric Guitar</option>
                        <option value="Acoustic Guitar">Acoustic Guitar</option>
                        <option value="Bass Guitar">Bass Guitar</option>
                        <option value="Drums">Drums</option>
                        <option value="Electronic Drums">Electronic Drums</option>
                        <option value="Guitar Amp">Guitar Amp</option>
                        <option value="Bass Amp">Bass Amp</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="brand">Brand</Label>
                    <Input id="brand" type="text" name="brand" value={item.brand} placeholder="Enter brand" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="model">Model</Label>
                    <Input id="model" type="text" name="model" value={item.model} placeholder="Enter model" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input id="notes" type="text" name="notes" value={item.notes} placeholder="Enter notes" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="location">Location</Label>
                    <Input id="location" type="text" name="location" value={item.location} placeholder="Enter location" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="availability">Available</Label>
                    <Input id="availability" type="checkbox" name="availability" checked={item.availability} onChange={handleCheckBox} />
                </FormGroup>
                <FormGroup>
                    <Label for="rating">Rating</Label>
                    <Input id="rating" type="text" name="rating" value={item.rating} onChange={handleChange} />
                </FormGroup>
                <Button color="primary" type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default ItemCreate;
