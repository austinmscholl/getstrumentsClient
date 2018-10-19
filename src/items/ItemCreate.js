import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './item.css';
import APIURL from '../helpers/environment'

class ItemCreate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            type: '',
            brand: '',
            model: '',
            notes: '',
            location: '',
            owner: '',
            availability: false,
            rating: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheckBox = (e) => {
        this.setState({
            availability: e.target.checked
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('button pressed')
        fetch(`${APIURL}/items`, {
            method: 'POST',
            body: JSON.stringify({ item: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((itemData) => {
            this.props.updateItemsArray();
            this.setState({
                id: '',
                type: '',
                brand: '',
                model: '',
                notes: '',
                location: '',
                owner: '',  // req.user.id?
                availability: false,
                rating: ''
            })
        })
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <h3>List an Instrument</h3>
                <hr />
                    <Form onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label for="type">Type</Label>
                            <Input type="select" name="type" id="type" value={this.state.type} onChange={this.handleChange} placeholder="Type">
                                <option></option>
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
                            <Input id="brand" type="text" name="brand" value={this.state.brand} placeholder="enter brand" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="model">Model</Label>
                            <Input id="model" type="text" name="model" value={this.state.model} placeholder="enter model" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="notes">Notes</Label>
                            <Input id="notes" type="text" name="notes" value={this.state.notes} placeholder="enter notes" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="location">Location</Label>
                            <Input id="location" type="text" name="location" value={this.state.location} placeholder="enter location" onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="availability">Available</Label>
                            <Input id="availability" type="checkbox" name="availability" value={this.state.availability} onChange={this.handleCheckBox} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="rating">Rating</Label>
                            <Input id="rating" type="text" name="rating" value={this.state.rating} onChange={this.handleChange} />
                        </FormGroup>
                        <Button color="#1A3165" type="submit"> Submit </Button>
                        </Form>
            </div>
        )
    }
}

export default ItemCreate;