import { LIST_ALL_FOOD } from '../actions/foodActions';

const initialState = {
    foodList: {foods: [], error: null, loading: false},
};

const foodReducer = function(state = initialState, action) {
    switch (action.type) {
        case LIST_ALL_FOOD:
            return {
                ...state,
                food: action.food
            };
        default:
            return state;
     }
};

export default foodReducer;
