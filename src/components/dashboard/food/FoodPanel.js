import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';
import EditModal from './EditForm';

class FoodPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			foodList: [],
            editFood: {
                id: '',
                name: '',
                description: '',
                errors: []
            },
            addFood: {
                name: '',
                description: '',
                errors: []
            },
            deleteSuccess: '',
            editModalShow: false,
            addModalShow: false,
		};

        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onAddChange = this.onAddChange.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
    }

    onDelete(name) {
        const self = this;
        axios.post("/duckfeed/food/delete", {name: name,})
        .then(function (response) {
            // handle success and update foodlist
            const foodList = self.state.foodList;
            const newFoodList = foodList.filter(food => food.name !== response.data.name);
            self.setState({
                foodList: newFoodList,
                deleteSuccess: response.name
            });

        })
        .catch(function (error) {
            self.setState({deleteSuccess: "error"});
        });
    }

    onAdd(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/food/add", {
            name: this.state.addFood.name,
            description: this.state.addFood.description
        })
        .then(function (response) {
            // add a food, update foodlist, clear addFood state, and close addModal
            let foodList = self.state.foodList;
            let newFoodList = foodList.concat([{
                _id: response.data._id,
                name: response.data.name,
                description: response.data.description,
            }]);
            self.setState({
                foodList: newFoodList,
                addFood: {
                    name: '',
                    description: '',
                    errors: []
                },
                addModalShow: false,
                editModalShow: false
            });
        })
        .catch(function (error) {
            self.setState({
                addFood: {
                    name: self.state.name,
                    description: self.state.description,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onEdit(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/food/update", {
            id: this.state.editFood.id,
            name: this.state.editFood.name,
            description: this.state.editFood.description
        })
        .then(function (response) {
            // update a food, update foodlist, clear editFood state, and close editModal
            let foodList = self.state.foodList;
            foodList.forEach((food, index) => {
                if(food._id === response.data._id) {
                    food.name = response.data.name;
                    food.description = response.data.description;
                }
            });

            self.setState({
                foodList: foodList,
                editFood: {
                    id: '',
                    name: '',
                    description: '',
                    errors: []
                },
                editModalShow: false,
                addModalShow: false
            });
        })
        .catch(function (error) {
            self.setState({
                editFood: {
                    id: self.state.id,
                    name: self.state.name,
                    description: self.state.description,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onHide() {
        this.setState({editModalShow: false, addModalShow: false});
    }

    onAddChange(e) {
        const newAddFood = { ...this.state.addFood, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newAddFood
        });
    }

    onEditChange(e) {
        const newEditFood = { ...this.state.editFood, [e.target.id]: e.target.value };

        this.setState({
            [e.target.getAttribute("formtype")]: newEditFood
        });
    }

    componentDidMount() {
        const self = this;
        axios.get("/duckfeed/food/all")
        .then(function (response) {
            // handle success
            self.setState({foodList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const foods = this.state.foodList;
        const self = this;

        return(
            <div className="food-panel-container">
                <button className="add-btn" onClick={() => {self.setState({addModalShow: true, editModalShow: false,});}}>
                    <i className="material-icons" style={{color: "#2a9df4"}}>add_circle</i>
                </button>
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody id="">
                    {foods.map(function(food, i){return(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{food.name}</td>
                            <td>{food.description}</td>
                            <td>
                                <button onClick={() => {self.onDelete(food.name);}}>
                                    <i className="material-icons" style={{color: "#d11a2a"}}>delete</i>
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        self.setState({
                                            editModalShow: true,
                                            addModalShow: false,
                                            editFood: {
                                                id: food._id,
                                                name: food.name,
                                                description: food.description,
                                                errors: []
                                            }
                                        });
                                    }}
                                >
                                    <i className="material-icons" style={{color: "#2a9df4"}}>edit</i>
                                </button>
                            </td>
                        </tr>
                    );})}
                    </tbody>
                </Table>
                <AddModal
                    addModalShow={this.state.addModalShow}
                    addFood={this.state.addFood}
                    onAdd={this.onAdd}
                    onHide={this.onHide}
                    onChange={this.onAddChange}
                />
                <EditModal
                    editModalShow={this.state.editModalShow}
                    onHide={this.onHide}
                    editFood={this.state.editFood}
                    onEdit={this.onEdit}
                    onChange={this.onEditChange}
                />
            </div>
        );
    }
}

export default FoodPanel;
