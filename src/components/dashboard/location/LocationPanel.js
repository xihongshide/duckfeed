import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';

class LocationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			locationList: [],
            addLocation: {
                name: '',
                errors: []
            },
            deleteSuccess: '',
            addModalShow: false,
		};

        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onAddChange = this.onAddChange.bind(this);
    }

    onDelete(name) {
        const self = this;
        axios.post("/duckfeed/location/delete", {name: name,})
        .then(function (response) {
            // handle success and update locationlist
            const locationList = self.state.locationList;
            const newLocationList = locationList.filter(location => location.name !== name);
            self.setState({
                locationList: newLocationList,
                deleteSuccess: "success"
            });

        })
        .catch(function (error) {
            self.setState({deleteSuccess: "error"});
        });
    }

    onAdd(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/location/add", {
            name: this.state.addLocation.name,
        })
        .then(function (response) {
            // add a location, update locationlist, clear addLocation state, and close addModal
            let locationList = self.state.locationList;
            let newLocationList = locationList.concat([{
                _id: response.data._id,
                name: response.data.name,
            }]);
            self.setState({
                locationList: newLocationList,
                addLocation: {
                    name: '',
                    errors: []
                },
                addModalShow: false,
            });
        })
        .catch(function (error) {
            self.setState({
                addLocation: {
                    name: self.state.name,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onHide() {
        this.setState({editModalShow: false, addModalShow: false});
    }

    onAddChange(e) {
        const newAddLocation = { ...this.state.addLocation, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newAddLocation
        });
    }

    componentDidMount() {
        const self = this;
        axios.get("/duckfeed/location/all")
        .then(function (response) {
            // handle success
            self.setState({locationList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const locations = this.state.locationList;
        const self = this;

        return(
            <div className="location-panel-container">
                <button className="add-btn" onClick={() => {self.setState({addModalShow: true});}}>
                    <i className="material-icons" style={{color: "#2a9df4"}}>add_circle</i>
                </button>
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody id="">
                    {locations.map(function(location, i){return(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{location.name}</td>
                            <td>
                                <button onClick={() => {self.onDelete(location.name);}}>
                                    <i className="material-icons" style={{color: "#d11a2a"}}>delete</i>
                                </button>
                            </td>
                        </tr>
                    );})}
                    </tbody>
                </Table>

                <AddModal
                    addModalShow={this.state.addModalShow}
                    addLocation={this.state.addLocation}
                    onAdd={this.onAdd}
                    onHide={this.onHide}
                    onChange={this.onAddChange}
                />
            </div>
        );
    }
}

export default LocationPanel;
