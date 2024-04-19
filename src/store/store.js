import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth';
import storage from 'redux-persist/lib/storage';
import {  FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';



const persistconfig = {
    key: 'root',    
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth: authSlice
})

const persistedReducer = persistReducer(persistconfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),



    // reducer: {
    //   auth : authSlice
    // }

});



export default store;