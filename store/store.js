import { countReducer,userReducer,loadingReducer} from './reducer'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios  from 'axios'

const userInitialState ={
    
}
const loadingInitialState={
  loading:false
}


const allReducers =combineReducers(
    {
        user:userReducer,
        loading:loadingReducer
    }
) 

// action creators
export function logout() {
    return dispatch => {
      axios
        .post('/logout')
        .then(resp => {
          if (resp.status === 200) {
            dispatch({
              type: LOGOUT,
            })
          } else {
            console.log('logout failed', resp)
          }
        })
        .catch(err => {
          console.log('logout failed', err)
        })
    }
  }
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
                user:userInitialState,
                loading:loadingInitialState
            },
            state
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk)),
    )
    return store
}