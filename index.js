const redux = require ('redux')
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger
const createStore = redux.legacy_createStore
const combineReducers = redux.combineReducers
const applymiddleware = redux.applyMiddleware
const buy_cake = "buy_cake"
const buy_icecream = "buy_icecream"
function buyCake (){
    return{
        type : buy_cake,
        info : "first redux action"
    }
}
function buyicecream (){
    return {
        type : buy_icecream
    }
}
   
    const cakeState = {
        noOfCakes : 10
    }
    const iceCreamState = {
        noOficecream : 10
    }



const cakeReducer = (state = cakeState,action)=>{
    switch (action.type){
        case buy_cake :
        return {
            ...state,
            noOfCakes :state.noOfCakes - 1
        }
    }
}
const icecreamReducer = (state = iceCreamState,action)=>{
    switch(action.type){
        case buy_icecream:
            return {
                ...state,
                noOficecream : state.noOficecream - 1
            }
    }

}
const rootReducer = combineReducers({
    cake : cakeReducer,
    icecream : icecreamReducer
})



const store = createStore(rootReducer,applymiddleware(logger))
console.log('initial state',store.getState());
 const unsubscribe = store.subscribe(()=>{})

store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyicecream())
store.dispatch(buyicecream())
store.dispatch(buyicecream())



unsubscribe()