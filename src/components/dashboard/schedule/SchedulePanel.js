import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';
import EditModal from './EditForm';

class SchedulePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			scheduleList: [],
            editSchedule: {
                id: '',
                user: '',
                food: '',
                time: '',
                feedAmount: '',
                duckAmount: '',
                location: '',
                startDate: '',
                endDate: '',
                errors: []
            },
            addSchedule: {
                user: '',
                food: '',
                time: '',
                feedAmount: '',
                duckAmount: '',
                location: '',
                startDate: '',
                endDate: '',
                errors: []
            },
            deleteSuccess: '',
            editModalShow: false,
            addModalShow: false,
		};

        this.addInitialState = {
            user: '',
            time: '',
            food: '',
            feedAmount: '',
            duckAmount: '',
            location: '',
            startDate: '',
            endDate: '',
            errors: []
        };
        this.editInitialState = {
            id: '',
            user: '',
            food: '',
            time: '',
            feedAmount: '',
            duckAmount: '',
            location: '',
            startDate: '',
            endDate: '',
            errors: []
        };
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onHide = this.onHide.bind(this);
        this.onAddChange = this.onAddChange.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
    }

    onDelete(id) {
        const self = this;
        axios.post("/duckfeed/schedule/delete", {id: id,})
        .then(function (response) {
            // handle success and update schedulelist
            if(response.data === "success") {
                const scheduleList = self.state.scheduleList;
                const newScheduleList = scheduleList.filter(schedule => schedule._id !== id);
                self.setState({
                    scheduleList: newScheduleList,
                    deleteSuccess: response.data
                });
            }
        })
        .catch(function (error) {
            self.setState({deleteSuccess: "error"});
        });
    }

    onAdd(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/schedule/add", {
            food: self.state.addSchedule.food,
            time: self.state.addSchedule.time,
            feedAmount: self.state.addSchedule.feedAmount,
            duckAmount: self.state.addSchedule.duckAmount,
            location: self.state.addSchedule.location,
            startDate: self.state.addSchedule.startDate,
            endDate: self.state.addSchedule.endDate,
        })
        .then(function (response) {
            // add a schedule, update schedulelist, clear addSchedule state, and close addModal
            let scheduleList = self.state.scheduleList;
            let newScheduleList = scheduleList.concat([{
                _id: response.data._id,
                user: response.data.user,
                food: response.data.food,
                time: response.data.time,
                feedAmount: response.data.feedAmount,
                duckAmount: response.data.duckAmount,
                location: response.data.location,
                startDate: response.data.startDate,
                endDate: response.data.endDate,
                active: response.data.active
            }]);
            self.setState({
                scheduleList: newScheduleList,
                addSchedule: self.addInitialState,
                addModalShow: false,
                editModalShow: false
            });
        })
        .catch(function (error) {
            self.setState({
                addSchedule: {
                    user: self.state.addSchedule.user,
                    food: self.state.addSchedule.food,
                    feedAmount: self.state.addSchedule.feedAmount,
                    duckAmount: self.state.addSchedule.duckAmount,
                    location: self.state.addSchedule.location,
                    time: self.state.addSchedule.time,
                    startDate: self.state.addSchedule.startDate,
                    endDate: self.state.addSchedule.endDate,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onEdit(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/schedule/update", {
            id: self.state.editSchedule.id,
            food: self.state.editSchedule.food,
            feedAmount: self.state.editSchedule.feedAmount,
            duckAmount: self.state.editSchedule.duckAmount,
            location: self.state.editSchedule.location,
            time: self.state.addSchedule.time,
            startDate: self.state.addSchedule.startDate,
            endDate: self.state.addSchedule.endDate,
        })
        .then(function (response) {
            // update a schedule, update schedulelist, clear editSchedule state, and close editModal
            let scheduleList = self.state.scheduleList;
            scheduleList.forEach((schedule, index) => {
                if(schedule._id === self.state.editSchedule.id) {
                    schedule.user = self.state.user;
                    schedule.food = response.data.food;
                    schedule.feedAmount = response.data.feedAmount;
                    schedule.duckAmount = response.data.duckAmount;
                    schedule.location = response.data.location;
                    schedule.time = response.data.time;
                    schedule.startDate = response.data.startDate;
                    schedule.endDate = response.data.endDate;
                }
            });

            self.setState({
                scheduleList: scheduleList,
                editSchedule: self.editInitialState,
                editModalShow: false,
                addModalShow: false
            });
        })
        .catch(function (error) {
            self.setState({
                editSchedule: {
                    id: self.state.editSchedule.id,
                    user: self.state.editSchedule.user,
                    food: self.state.editSchedule.food,
                    feedAmount: self.state.editSchedule.feedAmount,
                    duckAmount: self.state.editSchedule.duckAmount,
                    location: self.state.editSchedule.location,
                    time: self.state.editSchedule.time,
                    startDate: self.state.editSchedule.startDate,
                    endDate: self.state.editSchedule.endDate,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onHide() {
        this.setState({editModalShow: false, addModalShow: false});
    }

    onAddChange(e) {
        const newAddSchedule = { ...this.state.addSchedule, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newAddSchedule
        });
    }

    onEditChange(e) {
        const newEditSchedule = { ...this.state.editSchedule, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newEditSchedule
        });
    }

    componentDidMount() {
        const self = this;
        axios.get("/duckfeed/schedule/all")
        .then(function (response) {
            // get all schedule list and render to the schedule table
            self.setState({scheduleList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const schedules = this.state.scheduleList;
        const self = this;

        return(
            <div className="schedule-panel-container">
                <button className="add-btn" onClick={() => {self.setState({addModalShow: true, editModalShow: false,});}}>
                    <i className="material-icons" style={{color: "#2a9df4"}}>add_circle</i>
                </button>
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Food</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Feed Amount</th>
                            <th>Duck Amount</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody id="">
                    {schedules.map(function(schedule, i){return(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{schedule.user}</td>
                            <td>{schedule.food}</td>
                            <td>{schedule.startDate ? schedule.startDate.substring(0,10) : ''}</td>
                            <td>{schedule.endDate ? schedule.endDate.substring(0,10) : ''}</td>
                            <td>{schedule.feedAmount}</td>
                            <td>{schedule.duckAmount}</td>
                            <td>{schedule.location}</td>
                            {schedule.active ?
                                <td>
                                    <button onClick={() => {self.onDelete(schedule._id);}}>
                                        <i className="material-icons" style={{color: "#d11a2a"}}>delete</i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            self.setState({
                                                editModalShow: true,
                                                addModalShow: false,
                                                editSchedule: {
                                                    id: schedule._id,
                                                    user: schedule.user,
                                                    food: schedule.food,
                                                    startDate: schedule.startDate ? schedule.startDate : new Date(),
                                                    endDate: schedule.endDate ? schedule.startDate : new Date(),
                                                    feedAmount: schedule.feedAmount,
                                                    duckAmount: schedule.duckAmount,
                                                    location: schedule.location,
                                                    errors: []
                                                }
                                            });
                                        }}
                                    >
                                        <i className="material-icons" style={{color: "#2a9df4"}}>edit</i>
                                    </button>
                                </td>: null
                            }
                        </tr>
                    );})}
                    </tbody>
                </Table>

                <AddModal
                    addModalShow={this.state.addModalShow}
                    addSchedule={this.state.addSchedule}
                    onAdd={this.onAdd}
                    onHide={this.onHide}
                    onChange={this.onAddChange}
                />

                <EditModal
                    editModalShow={this.state.editModalShow}
                    editSchedule={this.state.editSchedule}
                    onEdit={this.onEdit}
                    onHide={this.onHide}
                    onChange={this.onEditChange}
                />
            </div>
        );
    }
}

export default SchedulePanel;
