import { put, call } from "redux-saga/effects";
import axios from "axios";
import { createSliceSaga } from "redux-toolkit-saga";
import {
  deleteQuestionList,
  setQuestioncreated,
  setQuestionsList,
  updateQuestionsSlice,
} from "./creerquestionSlice";
import { setExamsSlice } from "../creerexamin/creerexamSlice";

export const creerquestionSaga = createSliceSaga({
  name: "creerquesstionSaga",
  caseSagas: {
    *getQuestionsList() {
      const response = yield call(() =>
        axios.get("http://localhost:8000/api/questions")
      );
      yield put(setQuestionsList(response.data));
    },

    *postQuestionsList(data) {
      try {
        const response = yield call(() =>
          axios.post("http://localhost:8000/api/questions", data.payload)
        );
        if (response.status === 201) {
          yield put(setQuestioncreated(true));
          const newQuestions = yield call(() =>
            axios.get("http://localhost:8000/api/questions")
          );
          yield put(setQuestionsList(newQuestions.data));
        }
      } catch (error) {
        console.log(error);
      }
    },
    *deleteQuestionsList(data) {
      try {
        const response = yield call(() =>
          axios.delete("http://localhost:8000/api/questions/" + data.payload.id)
        );
        if (response.status) {
          yield put(deleteQuestionList(data.payload.id));
        }
      } catch (error) {
        console.log(error);
      }
    },

    *putQuestionForm(action) {
      try {
        const response = yield call(() =>
          axios.put(
            "http://localhost:8000/api/questions/" + action.payload.id,
            action.payload.body
          )
        );
        yield put(updateQuestionsSlice(response.data));
      } catch (error) {
        console.log(error);
      }
    },
    *assignQuestionsToExam(data) {
      try {
        const response = yield call(() =>
          axios.post(
            `http://localhost:8000/api/examens/${data.payload.examen_id}/assign-questions`,
            data.payload.body
          )
        );
        const exams = yield call(() =>
          axios.get("http://localhost:8000/api/examens")
        );
        yield put(setExamsSlice(exams.data));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export const {
  getQuestionsList,
  postQuestionsList,
  deleteQuestionsList,
  assignQuestionsToExam,
  putQuestionForm,
} = creerquestionSaga.actions;
