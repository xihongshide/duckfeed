import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';

class FoodTypePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			foodTypeList: [],
            addFoodType: {
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
        axios.post("/duckfeed/foodType/delete", {name: name,})
        .then(function (response) {
            // handle success and update foodTypelist
            const foodTypeList = self.state.foodTypeList;
            const newFoodTypeList = foodTypeList.filter(foodType => foodType.name !== name);
            self.setState({
                foodTypeList: newFoodTypeList,
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
        axios.post("/duckfeed/foodType/add", {
            name: this.state.addFoodType.name,
        })
        .then(function (response) {
            // add a foodType, update foodTypelist, clear addFoodType state, and close addModal
            let foodTypeList = self.state.foodTypeList;
            let newFoodTypeList = foodTypeList.concat([{
                _id: response.data._id,
                name: response.data.name,
            }]);
            self.setState({
                foodTypeList: newFoodTypeList,
                addFoodType: {
                    name: '',
                    errors: []
                },
                addModalShow: false,
            });
        })
        .catch(function (error) {
            self.setState({
                addFoodType: {
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
        const newAddFoodType = { ...this.state.addFoodType, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newAddFoodType
        });
    }

    componentDidMount() {
        const self = this;
        console.log("test1");
        axios.get("/duckfeed/foodType/all")
        .then(function (response) {
            // handle success
            console.log("response.data");
            self.setState({foodTypeList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const foodTypes = this.state.foodTypeList;
        const self = this;

        return(
            <div className="foodType-panel-container">
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
                    {foodTypes.map(function(foodType, i){return(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{foodType.name}</td>
                            <td>
                                <button onClick={() => {self.onDelete(foodType.name);}}>
                                    <i className="material-icons" style={{color: "#d11a2a"}}>delete</i>
                                </button>
                            </td>
                        </tr>
                    );})}
                    </tbody>
                </Table>

                <AddModal
                    addModalShow={this.state.addModalShow}
                    addFoodType={this.state.addFoodType}
                    onAdd={this.onAdd}
                    onHide={this.onHide}
                    onChange={this.onAddChange}
                />
            </div>
        );
    }
}

export default FoodTypePanel;
