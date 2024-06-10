import { put, call } from "redux-saga/effects";
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  deleteExamsSlice,
  setExamCreated,
  setExamResults,
  setExamSubmitted,
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
          yield put(setExamCreated(true));
          const newExams = yield call(() =>
            axios.get("http://localhost:8000/api/examens")
          );
          yield put(setExamsSlice(newExams.data));
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
        yield put(
          updateExamsSlice({ ...action.payload.body, ...response.data })
        );
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
    *postSubmitQuestions(data) {
      try {
        const submit_response = yield call(() =>
          axios.post("http://localhost:8000/api/reponses", data.payload)
        );
        const response = yield call(() =>
          axios.get("http://localhost:8000/api/reponses", data.payload)
        );
        yield put(setExamResults(response.data));
        yield put(setExamSubmitted(submit_response.data.data.id));
      } catch (error) {
        console.log(error);
      }
    },
    *getexamResults(data) {
      try {
        const response = yield call(() =>
          axios.get("http://localhost:8000/api/reponses", data.payload)
        );
        yield put(setExamResults(response.data));
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
  postSubmitQuestions,
  getexamResults,
} = creerexamSaga.actions;
