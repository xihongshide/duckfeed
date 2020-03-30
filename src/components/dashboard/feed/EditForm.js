import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foodlist: [],
            locationlist: []
        };
    }

    componentDidMount() {
        // get food list for food form field
        const self = this;
        axios.get("/duckfeed/food/all")
        .then(function (response) {
            const lists = response.data;
            let foodlist = [];
            lists.forEach(element => foodlist.push(element.name));
            self.setState({foodlist: foodlist});
        })
        .catch(function (error) {
            console.log(error);
        });

        axios.get("/duckfeed/location/all")
        .then(function (response) {
            const lists = response.data;
            let locationlist = [];
            lists.forEach(element => locationlist.push(element.name));
            self.setState({locationlist: locationlist});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        if (!this.props.editModalShow) {
            return null;
        }
        const errors = this.props.editFeed.errors;
        const foodlist = this.state.foodlist;
        const locationlist = this.state.locationlist;

        return (
            <Modal
                show={this.props.editModalShow}
                onHide={this.props.onHide}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Feed</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form noValidate onSubmit={this.props.onEdit}>
                        <div className="input-field col s12">
                            <select
                                onChange={this.props.onChange}
                                id="food"
                                formtype="editFeed"
                                required
                            >
                                <option></option>
                                {foodlist.map(function(food, i){
                                    return  <option value={food}>{food}</option>;
                                })}
                            </select>
                            <label htmlFor="food">Food</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFeed.time}
                                id="time"
                                formtype="editFeed"
                                type="datetime-local"
                                required
                                min="2000-01-01T00:01"
                                max="2100-01-01T00:01"
                            />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFeed.feedAmount}
                                id="feedAmount"
                                formtype="editFeed"
                                type="number"
                                required
                            />
                        <label htmlFor="feedAmount">Feed Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFeed.duckAmount}
                                id="duckAmount"
                                formtype="editFeed"
                                type="number"
                                required
                            />
                        <label htmlFor="duckAmount">Duck Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <select
                                onChange={this.props.onChange}
                                id="location"
                                formtype="editFeed"
                                required
                            >
                                <option></option>
                                {locationlist.map(function(location, i){
                                    return  <option value={location}>{location}</option>;
                                })}
                            </select>
                            <label htmlFor="location">Location</label>
                        </div>

                        {errors.map(function(error, i){
                            return <p className="red-text">*{error.msg}</p>;
                        })}

                        <button
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditForm;
