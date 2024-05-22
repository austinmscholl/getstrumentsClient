import React, { useState } from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import '../../src/styles.css';

const ItemTable = ({ items, deleteItem, updateItem }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [currentItemId, setCurrentItemId] = useState(null);

    const toggle = (id) => {
        setCurrentItemId(id);
        setDeleteModal(!deleteModal);
    };

    const handleDelete = (id) => {
        deleteItem(id);
        toggle(null);
    };

    return (
        <div className="tableColor">
            <h3>Listed Items</h3>
            <hr />
            <Table responsive>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Notes</th>
                        <th>Location</th>
                        <th>Availability</th>
                        <th>Rating</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.notes}</td>
                            <td>{item.location}</td>
                            <td>{item.availability.toString()}</td>
                            <td>{item.rating}</td>
                            <td>
                                <Button size="sm" onClick={() => toggle(item.id)} color="secondary">Delete</Button>
                                <Modal isOpen={deleteModal && currentItemId === item.id} toggle={toggle}>
                                    <ModalBody>
                                        Are you sure you want to delete this item?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" onClick={() => handleDelete(item.id)}>Yes</Button>
                                        <Button color="secondary" onClick={() => toggle(null)}>No</Button>
                                    </ModalFooter>
                                </Modal>
                                <Button size="sm" onClick={(e) => updateItem(e, item)} color="success">Update</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ItemTable;
