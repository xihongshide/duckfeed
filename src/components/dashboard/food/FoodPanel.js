import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';

class FoodPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			foodList: [],
            updateFood: {
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
        this.onAddChange = this.onAddChange.bind(this);
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
        const self = this;
        e.preventDefault();
        axios.post("/duckfeed/food/add", {
            name: this.state.addFood.name,
            description: this.state.addFood.description
        })
        .then(function (response) {
            // add a food and update foodlist
            let foodList = self.state.foodList;
            console.log(foodList);
            let newFoodList = foodList.concat([{
                _id: response.data._id,
                name: response.data.name,
                description: response.data.description,
            }]);
            console.log(newFoodList);
            self.setState({
                foodList: newFoodList,
                addFood: {
                    name: response.data.name,
                    description: response.data.description,
                    errors: []
                }
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

            console.log(self.state.addFood);
        });
    }

    onEdit(e) {
        e.preventDefault();
        axios.post("/duckfeed/food/edit", {name: this.state.name, description: this.state.description})
        .then(function (response) {
            // handle success

        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onAddChange(e) {
        const newAddFood = { ...this.state.addFood, [e.target.id]: e.target.value };

        this.setState({
            [e.target.getAttribute("formtype")]: newAddFood
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
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>
                                <button onClick={() => {self.setState({addModalShow: true});}}>
                                    <i className="material-icons" style={{color: "#2a9df4"}}>add_circle</i>
                                </button>
                            </th>
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
                                <button onClick={() => {self.setState({editModalShow: true});}}>
                                    <i className="material-icons" style={{color: "#2a9df4"}}>edit</i>
                                </button>
                            </td>
                        </tr>
                    );})}
                    </tbody>
                </Table>

                <AddModal
                    show={this.state.addModalShow}
                    addFood={this.state.addFood}
                    onAdd={this.onAdd}
                    onChange={this.onAddChange}
                />
            </div>
        );
    }
}

export default FoodPanel;
