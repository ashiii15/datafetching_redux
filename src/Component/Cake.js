const redux = require('redux')
const createStore = redux.legacy_createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const initialState = {
   loading : true,
   data : [],
   error : ''
}
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCESS = 'FETCH_USERS_SUCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUserrequest = ()=>{
   return {
       type : FETCH_USERS_REQUEST
   }
}
const  fetchUserssucess = (users)=>{
   return {
       type : FETCH_USERS_SUCESS,
       payload : users
   }
}
const fetchUserfailure = (error)=>{
   return {
       type : FETCH_USERS_FAILURE,
       payload :error
   }
}
const reducer = (state =initialState,action)=>{
   switch(action.type){
       case FETCH_USERS_REQUEST:
           return{
               ...state,
               laoding :true,
           }
           case FETCH_USERS_SUCESS:
               return {
                   ...state,
                   loading :false,
                   data : action.payload,
                   error :""
               }
               case FETCH_USERS_FAILURE:
                   return{
                       ...state,
                       loading :false,
                       data : "",
                       error : action.payload
                   }
   }
}
const fetchUsers = ()=>{
   return function (dispatch){
       dispatch(fetchUserrequest())
       axios.get("https://jsonplaceholder.typicode.com/users")
       .then((response)=>{
         const users =  response.data.map(user=>user.id)
         dispatch(fetchUserssucess(users))
       })
       .catch((error)=>{
           dispatch(fetchUserfailure(error.meassage))
       })
       

   }
}
const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{console.log(store.getState())})
 store.dispatch(fetchUsers())