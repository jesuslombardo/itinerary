export default (state = [], action) => {
    switch(action.type){
        case 'ADD_ITINERARY':
            return [...state, action.payload];
        case 'DELETE_ITINERARY':
            return state.filter((state, i) => i !== action.id);
        case 'COMPLETE_ITINERARY':
            return state.map((itinerary, i)=>i === action.id ? 
            {
                ...itinerary,
                complete:!itinerary.complete
            }
            :itinerary
            );
        case 'EDIT_ITINERARY':
            return state.map((itinerary, i)=>i === action.id ? {...itinerary,
                name:action.payload.name,
                adress:action.payload.adress
            }:
            itinerary
            );
        default:
            return state;
    }
}