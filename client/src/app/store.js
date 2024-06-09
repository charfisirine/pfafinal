import { configureStore , combineReducers} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import { connexionSaga } from '../Components/connexion/connexionSaga';
import { connexionSlice } from '../Components/connexion/connexionSlice';
import { creerexamSlice } from '../Components/creerexamin/creerexamSlice';
import { creerexamSaga } from '../Components/creerexamin/creerexamSaga';
import { creerquestionSaga } from '../Components/creerquestion/creerquestionSaga';
import { creerquestionSlice } from '../Components/creerquestion/creerquestionSlice';


// Create a saga middleware

const rootReducers = combineReducers({
    // Add  reducers here 

    exams:creerexamSlice.reducer,
    user: connexionSlice.reducer,
    questions: creerquestionSlice.reducer,

  });

const rootSagas = function* rootSaga() {
    yield all([
      //add saga here
      creerexamSaga.saga(),
      creerquestionSaga.saga(),
      connexionSaga.saga(),

    ])
}

const sagaMiddleware = createSagaMiddleware(); 

export const store = configureStore({
    reducer: rootReducers,
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      immutableCheck: false,
      serializableCheck: false
    }).concat(sagaMiddleware),
})

sagaMiddleware.run(rootSagas);
