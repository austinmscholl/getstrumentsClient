import React, { useState, useEffect } from 'react';
import { Container, Col } from 'reactstrap';
import RentTable from './RentTable';

const SelectionResults = ({ fetchResults, resultsFromProps = [], isSelectionMade = false }) => {
    const [results, setResults] = useState(resultsFromProps);
    const [selectionMade, setSelectionMade] = useState(isSelectionMade);

    useEffect(() => {
        if (fetchResults) {
            fetchResults().then(fetchedResults => {
                setResults(fetchedResults);
                setSelectionMade(true);
            });
        }
    }, [fetchResults]);

    return (
        <Container>
            <Col md="12">
                {selectionMade ? (
                    results.length >= 1 ? (
                        <RentTable results={results} />
                    ) : (
                        <div>No results found.</div>
                    )
                ) : (
                    <div>Results go here</div>
                )}
            </Col>
        </Container>
    );
};

export default SelectionResults;
