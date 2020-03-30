import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import AddModal from './AddForm';
import EditModal from './EditForm';

class FeedPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
			feedList: [],
            editFeed: {
                id: '',
                user: '',
                food: '',
                time: '',
                feedAmount: '',
                duckAmount: '',
                location: '',
                errors: []
            },
            addFeed: {
                user: '',
                food: '',
                time: '',
                feedAmount: '',
                duckAmount: '',
                location: '',
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
        axios.post("/duckfeed/feed/delete", {id: id,})
        .then(function (response) {
            // handle success and update feedlist
            if(response.data === "success") {
                const feedList = self.state.feedList;
                const newFeedList = feedList.filter(feed => feed._id !== id);
                self.setState({
                    feedList: newFeedList,
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
        axios.post("/duckfeed/feed/add", {
            food: self.state.addFeed.food,
            time: self.state.addFeed.time,
            feedAmount: self.state.addFeed.feedAmount,
            duckAmount: self.state.addFeed.duckAmount,
            location: self.state.addFeed.location,
        })
        .then(function (response) {
            // add a feed, update feedlist, clear addFeed state, and close addModal
            let feedList = self.state.feedList;
            let newFeedList = feedList.concat([{
                _id: response.data._id,
                user: response.data.user,
                food: response.data.food,
                time: response.data.time,
                feedAmount: response.data.feedAmount,
                duckAmount: response.data.duckAmount,
                location: response.data.location,
            }]);
            self.setState({
                feedList: newFeedList,
                addFeed: self.addInitialState,
                addModalShow: false
            });
        })
        .catch(function (error) {
            self.setState({
                addFeed: {
                    user: self.state.addFeed.user,
                    food: self.state.addFeed.food,
                    time: self.state.addFeed.time,
                    feedAmount: self.state.addFeed.feedAmount,
                    duckAmount: self.state.addFeed.duckAmount,
                    location: self.state.addFeed.location,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onEdit(e) {
        e.preventDefault();
        const self = this;
        axios.post("/duckfeed/feed/update", {
            id: self.state.editFeed.id,
            food: self.state.editFeed.food,
            time: self.state.editFeed.time,
            feedAmount: self.state.editFeed.feedAmount,
            duckAmount: self.state.editFeed.duckAmount,
            location: self.state.editFeed.location,
        })
        .then(function (response) {
            // update a feed, update feedlist, clear editFeed state, and close editModal
            let feedList = self.state.feedList;
            feedList.forEach((feed, index) => {
                if(feed._id === self.state.editFeed.id) {
                    feed.user = self.state.user;
                    feed.food = response.data.food;
                    feed.time = response.data.time;
                    feed.feedAmount = response.data.feedAmount;
                    feed.duckAmount = response.data.duckAmount;
                    feed.location = response.data.location;
                }
            });

            self.setState({
                feedList: feedList,
                editFeed: self.editInitialState,
                editModalShow: false,
            });
        })
        .catch(function (error) {
            self.setState({
                editFeed: {
                    id: self.state.editFeed.id,
                    user: self.state.editFeed.user,
                    food: self.state.editFeed.food,
                    time: self.state.editFeed.time,
                    feedAmount: self.state.editFeed.feedAmount,
                    duckAmount: self.state.editFeed.duckAmount,
                    location: self.state.editFeed.location,
                    errors: error.response.data.err ? error.response.data.err : []
                }
            });
        });
    }

    onHide() {
        this.setState({editModalShow: false, addModalShow: false});
    }

    onAddChange(e) {
        const newAddFeed = { ...this.state.addFeed, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newAddFeed
        });
    }

    onEditChange(e) {
        const newEditFeed = { ...this.state.editFeed, [e.target.id]: e.target.value };
        this.setState({
            [e.target.getAttribute("formtype")]: newEditFeed
        });
    }

    componentDidMount() {
        const self = this;
        axios.get("/duckfeed/feed/all")
        .then(function (response) {
            // get all feed list and render to the feed table
            self.setState({feedList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const feeds = this.state.feedList;
        const self = this;

        return(
            <div className="feed-panel-container">
                <button className="add-btn" onClick={() => {self.setState({addModalShow: true});}}>
                    <i className="material-icons" style={{color: "#2a9df4"}}>add_circle</i>
                </button>
                <Table borderless hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Food</th>
                            <th>Time(YY-MM-DD hh:mm)</th>
                            <th>Feed Amount</th>
                            <th>Duck Amount</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody id="">
                    {feeds.map(function(feed, i){return(
                        <tr key={i} >
                            <td>{i+1}</td>
                            <td>{feed.user}</td>
                            <td>{feed.food}</td>
                            <td>{feed.time.substring(2, 4) + "-" + feed.time.substring(5, 7)+ "-" + feed.time.substring(8, 10)}</td>
                            <td>{feed.feedAmount}</td>
                            <td>{feed.duckAmount}</td>
                            <td>{feed.location}</td>
                            <td>
                                <button onClick={() => {self.onDelete(feed._id);}}>
                                    <i className="material-icons" style={{color: "#d11a2a"}}>delete</i>
                                </button>
                                <button
                                    onClick={() => {
                                        self.setState({
                                            editModalShow: true,
                                            editFeed: {
                                                id: feed._id,
                                                user: feed.user,
                                                food: feed.food,
                                                time: feed.time,
                                                feedAmount: feed.feedAmount,
                                                duckAmount: feed.duckAmount,
                                                location: feed.location,
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
                    addFeed={this.state.addFeed}
                    onAdd={this.onAdd}
                    onHide={this.onHide}
                    onChange={this.onAddChange}
                />

                <EditModal
                    editModalShow={this.state.editModalShow}
                    editFeed={this.state.editFeed}
                    onEdit={this.onEdit}
                    onHide={this.onHide}
                    onChange={this.onEditChange}
                />
            </div>
        );
    }
}

export default FeedPanel;
