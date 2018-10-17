import React from 'react';
import { Alert, Container, Row, Col } from 'reactstrap';
import ItemCreate from './ItemCreate';
import ItemsTable from './ItemTable';
import ItemEdit from './ItemEdit';
import APIURL from '../helpers/environment';

class ItemIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            updatePressed: false,
            itemToUpdate: {},
            itemId: '',
            visible: true
        }
    }

    componentDidMount() {
        this.fetchItems()
    }

    fetchItems = () => {
        fetch(`${APIURL}/items`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((itemData) => {
                return this.setState({ items: itemData })
            })
    }

    itemDelete = (e) => {
        fetch(`${APIURL}/items/${e.target.id}`, {
            method: 'DELETE',
            body: JSON.stringify({ item: { id: e.target.id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => this.fetchItems())
    }

    itemUpdate = (e, item) => {
        console.log("updated item values:", {item: item})
        fetch(`${APIURL}/items/${item.id}`, {
            method: 'PUT',
            body: JSON.stringify({item}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => {
            console.log(res)
            this.setState({ updatePressed: false })
            this.fetchItems();
        })
    }

    setUpdatedItem = (e, item) => {
        console.log("item to update:", item)
        this.setState({
            updatePressed: true,
            itemToUpdate: item
        })
    }

    handleCancel = () => {
        this.setState({
            updatePressed: false
        })
    }

    render() {
        const items = this.state.items.length >= 1 ?
            <ItemsTable items={this.state.items} itemId={this.state.itemId}
            delete={this.itemDelete} update={this.setUpdatedItem} /> : <h2>Log an item to see a table</h2>
        return (
            <Container>
                <Row>
                    <Col md="3">
                        <ItemCreate token={this.props.token} updateItemsArray={this.fetchItems} />
                    </Col>
                    <Col md="9">
                        {items}
                    </Col>
                </Row>
                <Col md="12">
                    {
                        this.state.updatePressed ? <ItemEdit t={this.state.updatePressed} cancel={this.handleCancel} update={this.itemUpdate} item={this.state.itemToUpdate} />
                        : <div></div>
                    }
                </Col>
            </Container>
        )
    }
}


export default ItemIndex;