import CONSTANTS from "../constants/action-types"
const initialState = {
    username: '',
    rating: '',
    cells: [],
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.ADD_ARTICLE:
            return { ...state };
        default:
            return state;
    }
}
export default rootReducer;