'use client'

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import authReducer from './slice/authSlice';
import thunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const rootPersistConfig = {
  key: 'root',
  storage,

}

const rootReducer:any = combineReducers({ 
  auth: authReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)




export const store = configureStore({
  reducer:persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)