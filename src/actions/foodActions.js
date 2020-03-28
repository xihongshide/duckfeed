import axios from 'axios';

export const ADD_FOOD_ERROR = "ADD_FOOD_ERROR";
export const ADD_FOOD = "ADD_FOOD";
export const LIST_ALL_FOOD = "LIST_ALL_FOOD";
export const DELETE_FOOD = "DELETE_FOOD";
export const UPDATE_FOOD = "UPDATE_FOOD";

const food = {
    name: "apple",
    description: "this is apple"
};

export function listFood() {
    const foods = axios.get("/duckfeed/food/all");

    return {
        type:'LIST_ALL_FOOD',
        payload: foods,
    };
}

export const addFood = (userData) => dispatch => {
    axios
        .post("/feedDuck/food/add", food)
        .catch(err =>
            dispatch({
                type: ADD_FOOD_ERROR,
                payload: err.response.data
            })
        );
    return {
        type:'ADD_FOOD',
        payload: food
    };
};

export function deleteFood(Id) {
    return {
        type:'DELETE_FOOD',
        payload:Id
    };
}

export function updateFood(food) {
    return {
        type:'UPDATE_FOOD',
        payload:food
    };
}
