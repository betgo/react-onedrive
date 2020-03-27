const userInitialState ={
    
}
const countInitialState = {
    count:0
}
const loadingInitialState={
    loading:false
}


const LOGOUT = 'LOGOUT'

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case LOGOUT:
            return {}
        default:
            return state
    }
}


export const countReducer = (state = countInitialState, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                count:state.count+2 
            }
        default:
            return state
    }
}

export const loadingReducer = (state = loadingInitialState, action) => {
    switch (action.type) {
        case 'start':
            return {
                loading:true
            };
        case 'end':
            return {
                loading:false
            };

        default:
            return state
    }
}
