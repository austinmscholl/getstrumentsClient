// import React from 'react';
// import { Table, Button } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import './rent.css'

// const RentTable = (props) => {
//     let title = props.results[0].type;
//     if (title.charAt(title.length -1) !== 's') {
//         title = title + 's';
//     }
//     return (
//         <div className="rentTable">
//             <h3>{title}</h3>
//             <hr />
//             <Table striped>
//                 <thead>
//                     <tr>
//                         <th>Type</th>
//                         <th>Brand</th>
//                         <th>Model</th>
//                         <th>Notes</th>
//                         <th>Location</th>
//                         <th>Availability</th>
//                         <th>Rating</th>
//                         <th>Booking</th>
//                         <th></th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         props.results.map((item, id) => {
//                             return (
//                                 <tr key={id}>
//                                     <td>{item.type}</td>
//                                     <td>{item.brand}</td>
//                                     <td>{item.model}</td>
//                                     <td>{item.notes}</td>
//                                     <td>{item.location}</td>
//                                     <td>{item.availability.toString()}</td>
//                                     <td>{item.rating}</td>
//                                     <td><Link to="/bookings">Booking</Link></td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//             </Table>
//         </div>
//     );
// }


// export default RentTable;

import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import './rent.css'

class RentTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
    let title = this.props.results[0].type;
    if (title.charAt(title.length -1) !== 's') {
        title = title + 's';
    };
    
    return (
        <div className="rentTable">
            <h3>{title}</h3>
            <hr />
            <Table striped>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Notes</th>
                        <th>Location</th>
                        <th>Availability</th>
                        <th>Rating</th>
                        <th>Booking</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.results.map((item, id) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.type}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.model}</td>
                                    <td>{item.notes}</td>
                                    <td>{item.location}</td>
                                    <td>{item.availability.toString()}</td>
                                    <td>{item.rating}</td>
                                    <td><Link id={item.id} onClick={this.props.itemId} to="/bookings">Booking</Link></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )}
}


export default RentTable;