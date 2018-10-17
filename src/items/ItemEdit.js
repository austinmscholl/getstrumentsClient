import React from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

class ItemEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: '',
            type: '',
            brand: '',
            model: '',
            notes: '',
            location: '',
            availability: '',
            rating: ''
        };
    }

    componentWillMount() {
        this.setState({
            id: this.props.item.id,
            type: this.props.item.type,
            brand: this.props.item.brand,
            model: this.props.item.model,
            notes: this.props.item.notes,
            location: this.props.item.location,
            availability: this.props.item.availability,
            rating: this.props.item.rating
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        console.log('update pressed');
        e.preventDefault();
        this.props.update(e, this.state)
    }


    render() {
        return (
            <div>
                <Modal isOpen={true}>
                    <ModalHeader >List an Instrument</ModalHeader>
                    <ModalBody>
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
                                <Input id="brand" type="text" name="brand" value={this.props.item.brand} placeholder="enter brand" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="model">Model</Label>
                                <Input id="model" type="text" name="model" value={this.props.item.model} placeholder="enter model" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input id="notes" type="text" name="notes" value={this.props.item.notes} placeholder="enter notes" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="location">Location</Label>
                                <Input id="location" type="text" name="location" value={this.props.item.location} placeholder="enter location" onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="availability">Available?</Label>
                                <Input id="availability" type="checkbox" name="availability" value={this.props.item.availability} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="rating">rating</Label>
                                <Input id="rating" type="text" name="rating" value={this.props.item.rating} placeholder="enter rating" onChange={this.handleChange} />
                            </FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                            <Button onClick={this.props.cancel} color="secondary">Cancel</Button>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
}

export default ItemEdit;