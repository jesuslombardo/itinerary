import React from 'react';
import { connect} from 'react-redux';
import { deleteItinerary, completeItenerary } from '../actions';
import StopAdd from './StopAdd';

class ItineraryList extends React.Component {
    state = { 
        modal: false,
        itinerary : {id:0, name: "", adress: ""},
     };

    deleteItinerary = (id) =>{
        this.props.deleteItinerary(id)
    }
    editItinerary = (id, itinerary) => {
        this.setState({
            itinerary:{
                id: id,
                name: itinerary.name,
                adress: itinerary.adress.geocoded_address.formatted_address
            }
        })
        this.showModal()
    }
    showModal = () => {
        this.setState((prevState) => {
            return {modal: !prevState.modal};
        })
    }


    renderItineraries = () =>{
        
        return this.props.itineraries.map((itinerary, i) => 
            <tr className={itinerary.complete ? "completed" : ""} key={i}>
                <th>{i}</th>
                <th>{itinerary.name}</th>
                <th>{itinerary.adress.geocoded_address.formatted_address}</th>
                <th><input type="checkbox" onClick={() => this.props.completeItenerary(i)}></input></th>
                <th><button onClick={() => this.editItinerary(i, itinerary)}>Edit</button></th>
                <th><button onClick={() => this.deleteItinerary(i)}>Delete</button></th>
            </tr>
        );
    }

    render(){
        return(
            this.props.itineraries.length > 0 ? 
                <div>
                    <h2>Itinerary List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Stop Name</th>
                                <th>Adress</th>
                                <th>Complete</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderItineraries()}
                        </tbody>
                    </table>

                    
                    {this.state.modal ? 
                        <div className="modal">
                            <StopAdd 
                                term={this.state.itinerary.adress}
                                stopName={this.state.itinerary.name}
                                id={this.state.itinerary.id}
                            />
                            <button onClick={() => this.showModal()}>X</button>
                        </div> 
                        : ""
                    }
                </div>
            : ""
        )
    }
   
}

const mapStateToProps = (state) => {
    return { itineraries : state.itineraries,
        error: state.error};
}

export default connect(
    mapStateToProps,
    { deleteItinerary: deleteItinerary,
        completeItenerary: completeItenerary
    }
    )
    (ItineraryList);