import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../src/styles.css';

const RentTable = (props) => {
    let title = props.results[0].type;
    if (title.charAt(title.length - 1) !== 's') {
        title = title + 's';
    }

    return (
        <div className="rentTable">
            <h3>{title}</h3>
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
                        <th>Booking</th>
                    </tr>
                </thead>
                <tbody>
                    {props.results.map((item) => (
                        <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.brand}</td>
                            <td>{item.model}</td>
                            <td>{item.notes}</td>
                            <td>{item.location}</td>
                            <td>{item.availability.toString()}</td>
                            <td>{item.rating}</td>
                            <td>
                                <Link id={item.id} onClick={() => props.itemId(item.id)} to="/bookings">
                                    Booking
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default RentTable;
