import React from 'react';
import ItemIndex from '../items/ItemIndex';
import RentIndex from '../rent/RentIndex';
import BookingIndex from '../booking/BookingIndex';
import { Button } from 'reactstrap';
import './splash.css';
import {
    Route,
    Link,
    Switch
} from 'react-router-dom'


class Splash extends React.Component {
    constructor(props) {
        super(props)
        this.state =  {
            listDefault: true,
            rentDefault: true,
            itemId: null
        }
    }

    handleClick = () => {
        this.setState ({
            listDefault: false,
            rentDefault: false,
        })
    }

    handleItemIdClick = (e) => {
        // e.preventDefault()
        this.setState({
            itemId: e.target.id 
        });
    }


    render () {
    return (
        <div className="main">
            <div>
                <Switch>
                    <Route path="/list"><ItemIndex token={this.props.sessionToken} /></Route>
                    <Route path="/rent"><RentIndex token={this.props.sessionToken} itemId={this.handleItemIdClick} /></Route>
                    <Route path="/bookings"><BookingIndex token={this.props.sessionToken} itemId={this.state.itemId} /></Route>
                </Switch>
            </div>
                
            <div className="spaceBtns">
                <hr />
                {
                    this.state.listDefault &&  <div className="buttons">
                    <Link to='/list'>
                        <Button onClick={this.handleClick} color="#2D457D">List an Instrument</Button>
                    </Link>
                </div> 
                }
                {
                    this.state.rentDefault && <div className="buttons">
                    <Link to='/rent'>
                        <Button onClick={this.handleClick} color="#2D457D">Rent an Instrument</Button>
                    </Link>
                </div> 
                }
            </div>
        </div>
    );
}}

export default Splash;