import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import ItemCreate from './ItemCreate';
import ItemsTable from './ItemTable';
import ItemEdit from './ItemEdit';
import APIURL from '../helpers/environment';

const ItemIndex = ({ token }) => {
  const [items, setItems] = useState([]);
  const [updatePressed, setUpdatePressed] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${APIURL}/items`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      const itemData = await response.json();
      setItems(itemData);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const itemDelete = async (e) => {
    try {
      await fetch(`${APIURL}/items/${e.target.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
      });
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const itemUpdate = async (e, item) => {
    try {
      await fetch(`${APIURL}/items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ item }),
      });
      setUpdatePressed(false);
      fetchItems();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const setUpdatedItem = (e, item) => {
    setUpdatePressed(true);
    setItemToUpdate(item);
  };

  return (
    <Container>
      <Row>
        <Col md="3">
          <ItemCreate token={token} updateItemsArray={fetchItems} />
        </Col>
        <Col md="9">
          {items.length ? (
            <ItemsTable items={items} delete={itemDelete} update={setUpdatedItem} />
          ) : (
            <h2>Log an item to see a table</h2>
          )}
        </Col>
      </Row>
      {updatePressed && (
        <ItemEdit
          t={updatePressed}
          cancel={() => setUpdatePressed(false)}
          update={itemUpdate}
          item={itemToUpdate}
        />
      )}
    </Container>
  );
};

export default ItemIndex;
