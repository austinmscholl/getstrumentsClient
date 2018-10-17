import React from 'react';
import Select from 'react-select';
import SelectionResults from './SelectionResults';
import { Container, Row, Col } from 'reactstrap'
import RentTable from './RentTable';

class RentIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            type: ''
        }
    }

    fetchResults = event => {
        event.preventDefault();

        fetch(`http://localhost:5000/items/rent/${this.state.type}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ results: res })
            })
    }

    handleChange = (e) => {
        this.setState({
            type: e.target.value
        })
    }

    render() {
        const results = this.state.results.length >= 1 ?
            <RentTable itemId={this.props.itemId} results={this.state.results} />
            : <div></div>
        
        // const options = [
        //     { value: 'Electric Guitar', label: 'Electric Guitar' },
        //     { value: 'Acoustic Guitar', label: 'Acoustic Guitar' },
        //     { value: 'Bass Guitar', label: 'Bass Guitar' },
        //     { value: 'Drumset', label: 'Drumset' },
        //     { value: 'Electronic Drumset', label: 'Electronic Drumset' },
        //     { value: 'Guitar Amp', label: 'Guitar Amp' },
        //     { value: 'Bass Amp', label: 'Bass Amp' }
        // ]

        return (
            <div>
                <form onSubmit={(event) => this.fetchResults(event)}>
                    <label>
                        Pick an instrument:
                        <select id="selection" value={this.state.type} onChange={this.handleChange}>
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
                    {/* <Select options={options} onChange={() => this.fetchResults()} /> */}
                <Container>
                    <Row>
                        <Col md="9">
                            {results}
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}


export default RentIndex;