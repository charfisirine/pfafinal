import { put, call } from "redux-saga/effects";
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  deleteExamsSlice,
  setExamsSlice,
  updateExamsSlice,
} from "./creerexamSlice";

export const creerexamSaga = createSliceSaga({
  name: "creerexamSaga",
  caseSagas: {
    *getExamsList(data) {
      const response = yield call(() =>
        axios.get("http://localhost:8000/api/examens")
      );
      yield put(setExamsSlice(response.data));
    },

    *postExamForm(action) {
      try {
        const response = yield call(() =>
          axios.post("http://localhost:8000/api/examens", action.payload)
        );
        if (response.status === 201) {
          console.log("...");
        }
      } catch (error) {
        console.log(error);
      }
    },
    *putExamForm(action) {
      try {
        const response = yield call(() =>
          axios.put(
            "http://localhost:8000/api/examens/" + action.payload.id,
            action.payload.body
          )
        );
        yield put(updateExamsSlice({...action.payload.body, ...response.data}));
      } catch (error) {
        console.log(error);
      }
    },
    *deleteExamForm(action) {
      try {
        yield call(() =>
          axios.delete("http://localhost:8000/api/examens/" + action.payload.id)
        );
        yield put(deleteExamsSlice(action.payload.id));
      } catch (error) {
        console.log(error);
      }
    },

    *postQuestionsList(data) {
      try {
        const response = yield call(() =>
          axios.post("http://localhost:8000/api/questions", data.payload)
        );
        if (response.status === 201) {
          console.log("...");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const {
  getExamsList,
  postExamForm,
  putExamForm,
  deleteExamForm,
} = creerexamSaga.actions;
