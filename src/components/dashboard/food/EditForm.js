import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';

class EditForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.editModalShow) {
            return null;
        }
        const errors = this.props.editFood.errors;
        return (
            <Modal
                show={this.props.editModalShow}
                onHide={this.props.onHide}
                animation={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Food</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form noValidate onSubmit={this.props.onEdit}>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFood.name}
                                id="name"
                                formtype="editFood"
                                type="text"
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                onChange={this.props.onChange}
                                value={this.props.editFood.description}
                                formtype="editFood"
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
                            Update
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default EditForm;
