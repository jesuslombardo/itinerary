export default (state = [], action) => {
    switch(action.type){
        case 'ERROR_ADRESS':
            return [...state, action.payload];
        case 'DELETE_ERROR':
            return [];
        default:
            return state;
    }
}