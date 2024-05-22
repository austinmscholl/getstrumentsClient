import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';
import '../../src/styles.css';

const ItemEdit = ({ item, update, cancel }) => {
    const [updatedItem, setUpdatedItem] = useState({
        id: '',
        type: '',
        brand: '',
        model: '',
        notes: '',
        location: '',
        availability: false,
        rating: ''
    });

    useEffect(() => {
        setUpdatedItem({
            id: item.id,
            type: item.type,
            brand: item.brand,
            model: item.model,
            notes: item.notes,
            location: item.location,
            availability: item.availability,
            rating: item.rating
        });
    }, [item]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            [name]: value
        }));
    };

    const handleCheckBoxChange = (e) => {
        const { checked } = e.target;
        setUpdatedItem((prevItem) => ({
            ...prevItem,
            availability: checked
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        update(e, updatedItem);
    };

    return (
        <Modal isOpen={true}>
            <ModalHeader className="mdlHeader">Edit an Instrument</ModalHeader>
            <ModalBody className="mdlColor">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="type">Type</Label>
                        <Input type="select" name="type" id="type" value={updatedItem.type} onChange={handleChange}>
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
                        <Input id="brand" type="text" name="brand" value={updatedItem.brand} placeholder="Enter brand" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="model">Model</Label>
                        <Input id="model" type="text" name="model" value={updatedItem.model} placeholder="Enter model" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="notes">Notes</Label>
                        <Input id="notes" type="text" name="notes" value={updatedItem.notes} placeholder="Enter notes" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input id="location" type="text" name="location" value={updatedItem.location} placeholder="Enter location" onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="availability">Available?</Label>
                        <Input id="availability" type="checkbox" name="availability" checked={updatedItem.availability} onChange={handleCheckBoxChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="rating">Rating</Label>
                        <Input id="rating" type="text" name="rating" value={updatedItem.rating} placeholder="Enter rating" onChange={handleChange} />
                    </FormGroup>
                    <Button type="submit" color="primary">Submit</Button>
                    <Button onClick={cancel} color="secondary">Cancel</Button>
                </Form>
            </ModalBody>
        </Modal>
    );
};

export default ItemEdit;
