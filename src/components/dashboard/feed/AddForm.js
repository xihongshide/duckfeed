import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            foodlist: []
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({show: nextProps.addModalShow});
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
    }

    render() {
        if (!this.props.addModalShow) {
            return null;
        }

        const errors = this.props.addFeed.errors;
        const foodlist = this.state.foodlist;

        return (
            <Modal
                show={this.state.show}
                onHide={()=>{this.setState({show: false});}}
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
                                formtype="addFeed"
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
                                value={this.props.addFeed.time}
                                id="time"
                                formtype="addFeed"
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
                                value={this.props.addFeed.feedAmount}
                                id="feedAmount"
                                formtype="addFeed"
                                type="number"
                                required
                            />
                        <label htmlFor="feedAmount">Feed Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addFeed.duckAmount}
                                id="duckAmount"
                                formtype="addFeed"
                                type="number"
                                required
                            />
                        <label htmlFor="duckAmount">Duck Amount</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addFeed.location}
                                id="location"
                                formtype="addFeed"
                                type="text"
                                required
                            />
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
