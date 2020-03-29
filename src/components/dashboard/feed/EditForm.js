import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            foodlist: []
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({show: nextProps.editModalShow});
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
        if (!this.props.editModalShow) {
            return null;
        }
        const errors = this.props.editFeed.errors;
        const foodlist = this.state.foodlist;

        return (
            <Modal
                show={this.state.show}
                onHide={()=>{this.setState({show: false});}}
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
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFeed.location}
                                id="location"
                                formtype="editFeed"
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
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditForm;
