import { countReducer,userReducer } from './reducer'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const userInitialState ={
    
}
// const countInitialState = {
//     count:0
// }
// const nameInitialState ={
//     aaa:'sd',
//     name :'www'
// }

const allReducers =combineReducers(
    {
        user:userReducer
    }
) 

// console.log(store.getState())


// store.subscribe(()=>{
//     console.log("change",store.getState());
    
// })
export default function initializeStore(state){
    const store = createStore(
        allReducers,
        Object.assign(
            {},
            {
                user:userInitialState
            },
            state
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk)),
    )
    return store
}