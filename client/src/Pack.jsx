import React from 'react';
import ReactDOM from 'react-dom';

class Pack extends React.Component {
	constructor(props) {
		super(props);
	}

  render() {
		return (
			<div>
				<div className="dropdown">
					<button>
					Select a Trip
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<a className="dropdown-item" href="fwefew">Canada</a>
					</div>
				</div>

				<div className="row">
					<span>Canada</span>
					<span>June 2 -June 8</span>
				</div>

				<div>
					<div className="row"><h3 className="col-sm-6">Shared</h3><i className="col-sm-6 fas fa-plus"></i></div>
						<div>
						Tent 
						<i class="fas fa-check-circle"></i>
						</div>
						<div>
						Water Filter
						<i class="fas fa-check-circle"></i>
						</div>
					<div className="row"><h3 className="col-sm-6">Favors</h3><i className="col-sm-6 fas fa-plus"></i></div>
						<div>
						Hiking Poles 
						<i class="fas fa-check-circle"></i>
						</div>
						<div>
						Hiking Boots
						<i class="fas fa-check-circle"></i>
						</div>
					<div className="row"><h3 className="col-sm-6">Personal</h3><i className="col-sm-6 fas fa-plus"></i></div>
					<div className="row">
						<h4 className="col-md-4">Self</h4>
							<ul>Sunscreen></ul>
							<ul>Hat></ul>
							<ul>Undergarments></ul>
						<h4 className="col-md-4">Claimed Group</h4>
						<h4 className="col-md-4">Claimed Favor</h4>
					</div>
				</div>
			</div>
		)
	}
};

export default Pack;
