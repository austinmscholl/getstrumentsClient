import React from 'react';
import { Container, Col } from 'reactstrap';
import RentTable from './RentTable';

class SelectionResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: [],
            selectionMade: false,
            type: ''
        }
    }

    handleChange(e) {
        
    }

    render() {
        const results = this.state.results.length >= 1 ?
            <RentTable results={this.state.results} /> :
            <div>Or here</div>
        return (
            <Container>
                <Col md="12">
                    {
                        this.state.selectionMade ? {results}
                        : <div>Results go here</div>
                    }
                </Col>
            </Container>
        )
    }
}


export default SelectionResults;