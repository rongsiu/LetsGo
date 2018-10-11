import React from 'react';

class NewTrip extends React.Component {
	state = {
		location: '',
		start: '',
		end: ''
	}

  handleReset = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

	addTrip = e => {
    e.preventDefault();
    if (this.state.location.trim() && this.state.start.trim() && this.state.end.trim()) {
      this.props.onAddPost(this.state);
      this.handleReset();
    }
  };

  render() {
    return (
      <div className="container">
        <form className="add_trip">
          <input className="start_form" type="text" autocomplete="off" placeholder="   Location" id="newTrip"/>
          <input type="date" id="start"/>
          <input type="date" id="end"/>
          <input className="end_form" type="submit" value="Add" onClick={(e) => this.addTrip($('#newTrip').val(), $('#start').val(), $('#end').val(), e)}/>
        </form>
      <div>
    )
}
}


export default NewTrip;