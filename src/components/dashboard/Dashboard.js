import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Tabs, Tab } from 'react-bootstrap';

// panels
import FoodPanel from "./food/FoodPanel";
import FeedPanel from "./feed/FeedPanel";
import LocationPanel from "./location/LocationPanel";

class Dashboard extends Component {
	onLogoutClick = e => {
		e.preventDefault();
		this.props.logoutUser();
	};

	render() {
		const { user } = this.props.auth;

		return (
			<div className="container valign-wrapper">
				<div className="dashboard landing-copy center-align">
                    <div className="dash-header">
    					<h6>
    						<b>Welcome </b> {user.name.split(" ")[0]}!
    					</h6>
    					<button
    						onClick={this.onLogoutClick}
    						className="logout-btn btn btn-large waves-effect waves-light hoverable blue accent-3"
    					>
    						Logout
    					</button>
                    </div>
                    <div className="panels">
                        <ControlledTabs />
                    </div>
				</div>
			</div>
		);
	}
}

function ControlledTabs() {
	const [key, setKey] = useState("location");

	return (
		<Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
			<Tab eventKey="food" title="Food">
                <FoodPanel />
			</Tab>
			<Tab eventKey="feed" title="Feed">
				<FeedPanel />
			</Tab>
			<Tab eventKey="schedule" title="Schedule">
			    schedule
			</Tab>
            <Tab eventKey="location" title="Location">
				<LocationPanel />
			</Tab>
		</Tabs>
	);
}


Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
