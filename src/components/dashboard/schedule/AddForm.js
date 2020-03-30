import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class AddForm extends Component {
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
        if (!this.props.addModalShow) {
            return null;
        }

        const errors = this.props.addSchedule.errors;
        const foodlist = this.state.foodlist;
        const locationlist = this.state.locationlist;

        return (
            <Modal
                show={this.props.addModalShow}
                onHide={this.props.onHide}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Feed</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form noValidate onSubmit={this.props.onAdd}>
                        <div className="input-field col s12">
                            <select
                                onChange={this.props.onChange}
                                id="food"
                                formtype="addSchedule"
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
                                value={this.props.addSchedule.startDate}
                                id="startDate"
                                formtype="addSchedule"
                                type="date"
                                required
                                min="2000-01-01"
                                max="2100-01-01"
                            />
                            <label htmlFor="startDate">Start Date</label>
                        </div>

                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addSchedule.endDate}
                                id="endDate"
                                formtype="addSchedule"
                                type="date"
                                required
                                min="2000-01-01"
                                max="2100-01-01"
                            />
                            <label htmlFor="endDate">End Date</label>
                        </div>

                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addSchedule.time}
                                id="time"
                                formtype="addSchedule"
                                type="time"
                                required
                            />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addSchedule.feedAmount}
                                id="feedAmount"
                                formtype="addSchedule"
                                type="number"
                                required
                            />
                        <label htmlFor="feedAmount">Feed Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addSchedule.duckAmount}
                                id="duckAmount"
                                formtype="addSchedule"
                                type="number"
                                required
                            />
                        <label htmlFor="duckAmount">Duck Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <select
                                onChange={this.props.onChange}
                                id="location"
                                formtype="addSchedule"
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
                            Add
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddForm;
