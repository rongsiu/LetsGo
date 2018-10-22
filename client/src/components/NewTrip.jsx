import React from 'react';
import ReactDOM from 'react-dom';

class NewTrip extends React.Component {
    constructor(props) {
    super(props)
  
	this.state = {
		location: '',
		start: '',
		end: ''
	}

  this.handleInputChange = this.handleInputChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleReset = this.handleReset.bind(this)
}

  handleInputChange(e){
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    console.log('caaa')
    console.log('cccc', this.state)
    if(this.state.location.trim() && this.state.start.trim() && this.state.end.trim()) {
      console.log(this.props, this.state)
      this.props.onAddTrip(this.state);
      this.handleReset();
    }
    
  };

  handleReset(){
    console.log('bbbb')
    this.setState({
      location: '',
      start: '',
      end: ''
    });
  };

  render() {
    return (
      <div className="container">
        <form className="add_trip" onSubmit={ this.handleSubmit }>
          <input name="location" className="start_form" type="text" autocomplete="off" placeholder="   Location" onChange={ this.handleInputChange } value={ this.state.location }/>
          <input name="start" type="date" onChange={ this.handleInputChange } value={ this.state.start }/>
          <input name="end" type="date" onChange={ this.handleInputChange } value={ this.state.end }/>
          <input className="end_form" type="submit" value="Add" />
        </form>
      </div>
    )
}
}


export default NewTrip;