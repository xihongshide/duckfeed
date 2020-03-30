import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
	<div className="landing container valign-wrapper">
		<div className="row">
			<div className="col s12 center-align">
				<h1>
					An application to collect duck feed information.
				</h1>

				<br />
				<div className="col s6">
					<Link
						to="/register"
						className="btn waves-effect waves-light hoverable blue accent-3"
					>
						Register
					</Link>
				</div>
				<div className="col s6">
					<Link
						to="/login"
						className="btn waves-effect waves-light hoverable blue accent-3"
					>
						Log In
					</Link>
				</div>
			</div>
		</div>
	</div>
);

export default Landing;
