import React, { useState, useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Button } from 'reactstrap';
import APIURL from '../helpers/environment';

const BookingIndex = (props) => {
    const [selection, setSelection] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });
    const [bookings, setBookings] = useState([]);
    const [itemId, setItemId] = useState(props.itemId);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = () => {
        fetch(`${APIURL}/bookings`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(bookingData => setBookings(bookingData))
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
    };

    const handleDateChange = (ranges) => {
        setSelection(ranges.selection);
    };

    const handleResetClick = () => {
        setSelection({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${APIURL}/bookings`, {
            method: 'POST',
            body: JSON.stringify({ booking: { ...selection, itemId } }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': props.token
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(() => {
            handleResetClick();
            alert("Congratulations, you've booked this instrument!");
        })
        .catch(error => {
            console.error('Error making booking:', error);
        });
    };

    const { startDate, endDate } = selection;

    return (
        <div>
            <h4>Book an Instrument</h4>
            <div className="RangeExample">
                <p>
                    {!startDate && !endDate && 'Please select the first day.'}
                    {startDate && !endDate && 'Please select the last day.'}
                    {startDate && endDate &&
                        `Selected from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}`}{' '}
                    {startDate && endDate && (
                        <button className="link" onClick={handleResetClick}>
                            Reset
                        </button>
                    )}
                </p>
                <DateRangePicker
                    onChange={handleDateChange}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={[selection]}
                    direction="horizontal"
                />
                <div>
                    <Button onClick={handleSubmit} color="primary">Book this instrument!</Button>
                </div>
            </div>
        </div>
    );
};

export default BookingIndex;
