import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import RentTable from './RentTable';
import APIURL from '../helpers/environment';

const RentIndex = (props) => {
    const [results, setResults] = useState([]);
    const [type, setType] = useState('');

    const fetchResults = (event) => {
        event.preventDefault();
        fetch(`${APIURL}/items/rent/${type}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.token
            })
        })
            .then((res) => res.json())
            .then((res) => {
                setResults(res);
            });
    };

    const handleChange = (e) => {
        setType(e.target.value);
    };

    const resultsTable = results.length >= 1 ? 
        <RentTable itemId={props.itemId} results={results} /> : 
        <div></div>;

    return (
        <div>
            <form onSubmit={fetchResults}>
                <label>
                    Pick an instrument:
                    <select id="selection" value={type} onChange={handleChange}>
                        <option value="Electric Guitar">Electric Guitar</option>
                        <option value="Acoustic Guitar">Acoustic Guitar</option>
                        <option value="Bass Guitar">Bass Guitar</option>
                        <option value="Drums">Drums</option>
                        <option value="Electronic Drums">Electronic Drums</option>
                        <option value="Guitar Amp">Guitar Amp</option>
                        <option value="Bass Amp">Bass Amp</option>
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <Container>
                <Row>
                    <Col md="9">
                        {resultsTable}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RentIndex;
