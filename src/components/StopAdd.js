import React from 'react';
import { connect} from 'react-redux';
import { addItinerary, editItinerary } from '../actions';

class StopAdd extends React.Component {
    state = { 
        term : this.props.term || "",
        stopName: this.props.stopName || "",
        errors: []
     };

    changeAdress = (event) => {
        this.setState({ term: event.target.value});
        return event.target.value && event.target.value.length < 3 ? this.setState({ errors: "The adress must have at least 3 characters"}): this.setState({ errors: ""});
    }

    changeName = (event) => {
        this.setState({ stopName: event.target.value});
    }

    submitItinerary = (event) => {
        event.preventDefault();
        if(this.state.errors && this.state.errors.length > 0) return false; // with errors
        if(this.props.term){
            this.props.editItinerary(this.props.id,this.state.stopName,this.state.term); //editing
            return false;
        }
    
        const newStop = {
            stopName : this.state.stopName,
            stopAdress : this.state.term
        }

        this.props.addItinerary(newStop)
    }
    
    render(){
        return (
        <div className="addStop">
            <h2>{!this.props.term ? "Add New Stop" : "Edit Stop"}</h2>
            <form onSubmit={this.submitItinerary}>
                <div>
                    <div className="formGroup">
                        <label htmlFor="name">Name:</label> 
                        <input 
                            id="name"
                            type="text" 
                            placeholder="stop name"
                            value={this.state.stopName}
                            onChange = {this.changeName} 
                            required
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="adress">Stop Adress:</label>
                        <input 
                            id="adress"
                            type="text" 
                            placeholder="stop adress" 
                            value={this.state.term}
                            onChange = {this.changeAdress} 
                            required
                        /> 
                    </div>

                    <input 
                        className="submitBtn"
                        type="submit" 
                        value={!this.props.term ? "Add" : "Save"} 
                    />

                    <div className="errors">
                        {this.state.errors || this.props.error}
                    </div>
                    
                </div>
            </form>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { itineraries : state.itineraries,
    error: state.error};
}
   
export default connect(
    mapStateToProps,
    { addItinerary: addItinerary,
        editItinerary: editItinerary
    })(StopAdd);
 
