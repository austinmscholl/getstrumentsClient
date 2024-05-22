import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ItemCreate from './ItemCreate';
import ItemsTable from './ItemTable';
import ItemEdit from './ItemEdit';
import APIURL from '../helpers/environment';

const ItemIndex = (props) => {
    const [items, setItems] = useState([]);
    const [updatePressed, setUpdatePressed] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = () => {
        fetch(`${APIURL}/items`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        })
        .then(res => res.json())
        .then(itemData => setItems(itemData));
    };

    const itemDelete = (id) => {
        fetch(`${APIURL}/items/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        })
        .then(() => fetchItems());
    };

    const itemUpdate = (item) => {
        fetch(`${APIURL}/items/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({ item }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        })
        .then(() => {
            setUpdatePressed(false);
            fetchItems();
        });
    };

    const setUpdatedItem = (item) => {
        setUpdatePressed(true);
        setItemToUpdate(item);
    };

    const handleCancel = () => {
        setUpdatePressed(false);
    };

    return (
        <Container>
            <Row>
                <Col md="3">
                    <ItemCreate token={props.token} updateItemsArray={fetchItems} />
                </Col>
                <Col md="9">
                    {items.length > 0 ? (
                        <ItemsTable items={items} delete={itemDelete} update={setUpdatedItem} />
                    ) : (
                        <h2>Log an item to see a table</h2>
                    )}
                </Col>
            </Row>
            <Col md="12">
                {updatePressed && (
                    <ItemEdit
                        t={updatePressed}
                        cancel={handleCancel}
                        update={itemUpdate}
                        item={itemToUpdate}
                    />
                )}
            </Col>
        </Container>
    );
};

export default ItemIndex;
