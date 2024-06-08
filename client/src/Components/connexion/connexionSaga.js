import { put, call } from "redux-saga/effects";
import { setUserSlice } from "./connexionSlice";
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
// const BASE_URL = 'https://someurl.com';

export const connexionSaga = createSliceSaga({
  name: "connexionSaga",
  caseSagas: {
    *postLogin(data) {
      try {
        const response = yield call(() =>
          axios.post(
            `http://localhost:8000/api/${data.payload.type}/login`,
            data.payload.formData
          )
        );
        if (response.status === 200) {
          yield put(
            setUserSlice({
              user: response.data[data.payload.type],
              type: data.payload.type,
              token: response.data.token,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    *postLogout(data) {
      try {
        const response = yield call(() =>
          axios.post(
            //post axios tib3ath 3 parametre ilouwil lil url theni  body w il thelith header 
            `http://localhost:8000/api/${data.payload.type}/logout`,
            {}, 
            {
              headers: {
                Authorization: "Bearer " + data.payload.token,
              },
            }
          )
        );
        if (response.status === 200) {
          yield put(
            setUserSlice({
              user: null,
              type: null,
              token: null,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
export const { postLogin, postLogout } = connexionSaga.actions;
