import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import FoodPanel from "./food/FoodPanel";

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
    						<b>Hey </b> {user.name.split(" ")[0]}!
    					</h6>
    					<button
    						onClick={this.onLogoutClick}
    						className="logout-btn btn btn-large waves-effect waves-light hoverable blue accent-3"
    					>
    						Logout
    					</button>
                    </div>
                    <div className="panels">
                        <FoodPanel />
                    </div>
				</div>
			</div>
		);
	}
}

Dashboard.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
