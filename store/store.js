import { countReducer,userReducer } from './reducer'
import { createStore,combineReducers,applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios  from 'axios'

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
                user:userInitialState
            },
            state
        ),
        composeWithDevTools(applyMiddleware(ReduxThunk)),
    )
    return store
}