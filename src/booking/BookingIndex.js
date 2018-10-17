import React from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import { Button } from 'reactstrap';
import 'react-day-picker/lib/style.css';
import APIURL from '../helpers/environment';

export default class Example extends React.Component {
    static defaultProps = {
        numberOfMonths: 2,
    };
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleResetClick = this.handleResetClick.bind(this);
        this.state =  this.getInitialState();
    }
    getInitialState() {
        return {
            from: undefined,
            to: undefined,
            renterId: '',
            bookings: [],
            itemId: this.props.itemId
        };
    }

    fetchBookings = () => {
        fetch(`${APIURL}/bookings`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res => res.json())
            .then((bookingData) => {
                return this.setState({ bookings: bookingData })
            }))
    }

    handleDayClick(day) {
        const range = DateUtils.addDayToRange(day, this.state);
        this.setState(range);
    }
    handleResetClick() {
        this.setState(this.getInitialState());
    }
    handleSubmit = (e) => { 
        e.preventDefault();
        fetch(`${APIURL}/bookings`, {
            method: 'POST',
            body: JSON.stringify({ booking: this.state }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((bookingData) => {
            this.getInitialState();
            alert("Congratulations, you've booked this instrument!")
        })
    }
    render() {
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        return (
            <div>
                <h4>Book an Instrument</h4>
                <div className="RangeExample">
                    <p>
                        {!from && !to && 'Please select the first day.'}
                        {from && !to && 'Please select the last day.'}
                        {from &&
                            to &&
                        `Selected from ${from.toLocaleDateString()} to
                            ${to.toLocaleDateString()}`}{' '}
                        {from &&
                            to && (
                                <button className="link" onClick={this.handleResetClick}>
                                    Reset
                                </button>
                        )}
                    </p>
            <DayPicker
            className="Selectable"
            numberOfMonths={this.props.numberOfMonths}
            selectedDays={[from, { from, to }]}
            modifiers={modifiers}
            onDayClick={this.handleDayClick}
            />
            <div>
                <Button onClick={this.handleSubmit} color="primary">Book this instrument!</Button>
            </div>
            <Helmet>
            <style>{`
                .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                    background-color: #f0f8ff !important;
                    color: #4a90e2;
                }
                .Selectable .DayPicker-Day {
                    border-radius: 0 !important;
                }
                .Selectable .DayPicker-Day--start {
                    border-top-left-radius: 50% !important;
                    border-bottom-left-radius: 50% !important;
                }
                .Selectable .DayPicker-Day--end {
                    border-top-right-radius: 50% !important;
                    border-bottom-right-radius: 50% !important;
                }
                `}</style>
            </Helmet>
        </div>
      </div>
    );
  }
}