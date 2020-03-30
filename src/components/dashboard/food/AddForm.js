import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class AddForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.addModalShow) {
            return null;
        }
        const errors = this.props.addFood.errors;
        return (
            <Modal
                show={this.props.addModalShow}
                onHide={this.props.onHide}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Food</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form noValidate onSubmit={this.props.onAdd}>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addFood.name}
                                id="name"
                                formtype="addFood"
                                type="text"
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.addFood.description}
                                formtype="addFood"
                                id="description"
                                type="text"
                            />
                            <label htmlFor="description">Description</label>
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
