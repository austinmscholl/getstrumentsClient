// import React from 'react';
// import { Table, Button } from 'reactstrap';

// const ItemTable = (props) => {
//     return (
//         <div>
//             <h3>Listed Items</h3>
//             <hr />
//             <Table striped responsive>
//                 <thead>
//                     <tr>
//                         {/* <th>#</th> */}
//                         <th>Type</th>
//                         <th>Brand</th>
//                         <th>Model</th>
//                         <th>Notes</th>
//                         <th>Location</th>
//                         {/* <th>Owner</th> */}
//                         <th>Availability</th>
//                         <th>Rating</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         props.items.map((item, id) => {
//                             return (
//                                 <tr key={id}>
//                                     {/* <th scope="row">{item.id}</th> */}
//                                     <td>{item.type}</td>
//                                     <td>{item.brand}</td>
//                                     <td>{item.model}</td>
//                                     <td>{item.notes}</td>
//                                     <td>{item.location}</td>
//                                     {/* <td>{item.owner}</td> */}
//                                     <td>{item.availability.toString()}</td>
//                                     <td>{item.rating}</td>
//                                     <td>
//                                         <Button size="sm" id={item.id} onClick={props.delete} color="secondary">Delete</Button>
//                                     </td>
//                                     <td>
//                                         <Button size="sm" id={item.id} onClick={(e) => { props.update(e, item)}} color="success">Update</Button>
//                                     </td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//             </Table>
//         </div>
//     );
// }


// export default ItemTable;


import React from 'react';
import { Table, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

class ItemTable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            deleteModal: false
        }
    }

    toggle = (e) => {
        this.setState({
            deleteModal: !this.state.deleteModal
        })
    }

    render() {
        return (
            <div>
                <h3>Listed Items</h3>
                <hr />
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Notes</th>
                            <th>Location</th>
                            <th>Availability</th>
                            <th>Rating</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.items.map((item, id) => {
                                return (
                                    <tr key={item.id}>
                                        <td>{item.type}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.model}</td>
                                        <td>{item.notes}</td>
                                        <td>{item.location}</td>
                                        <td>{item.availability.toString()}</td>
                                        <td>{item.rating}</td>
                                        <td>
                                            {/* <Button size="sm" id={item.id} onClick={this.props.delete} color="secondary">Delete</Button> */}
                                            <Button size="sm" id={item.id} onClick={this.toggle} color="secondary">Delete</Button>
                                                <Modal isOpen={this.state.deleteModal} toggle={this.toggle}>
                                                    <ModalBody>
                                                        Are you sure you want to delete this item?
                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="danger" id={item.id} onClick={(e) => {this.toggle(e); this.props.delete(e)}}>Yes</Button>
                                                        <Button color="secondary" onClick={this.toggle}>No</Button>
                                                    </ModalFooter>
                                                </Modal>
                                        </td>
                                        <td>
                                            <Button size="sm" id={item.id} onClick={(e) => { this.props.update(e, item)}} color="success">Update</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        );
    }
}
    

export default ItemTable;