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
        const errors = this.props.editSchedule.errors;
        const foodlist = this.state.foodlist;
        const locationlist = this.state.locationlist;
        console.log(this.props.editSchedule);
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
                                formtype="editSchedule"
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
                                value={this.props.editSchedule.startDate}
                                id="startDate"
                                formtype="editSchedule"
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
                                value={this.props.editSchedule.endDate}
                                id="endDate"
                                formtype="editSchedule"
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
                                value={this.props.editSchedule.time}
                                id="time"
                                formtype="editSchedule"
                                type="time"
                                required
                            />
                            <label htmlFor="time">Time</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editSchedule.feedAmount}
                                id="feedAmount"
                                formtype="editSchedule"
                                type="number"
                                required
                            />
                        <label htmlFor="feedAmount">Feed Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editSchedule.duckAmount}
                                id="duckAmount"
                                formtype="editSchedule"
                                type="number"
                                required
                            />
                        <label htmlFor="duckAmount">Duck Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <select
                                onChange={this.props.onChange}
                                id="location"
                                formtype="editSchedule"
                                required
                            >
                                <option></option>
                                {locationlist.map(function(location, i){
                                    return  <option value={location}>{location}</option>;
                                })}
                            </select>
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
