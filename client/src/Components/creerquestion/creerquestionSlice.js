import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: null,
  questionUpdated: null,
};

export const creerquestionSlice = createSlice({
  name: "creerquestionSaga",
  initialState,
  reducers: {
    setQuestionsList: (state, action) => {
      state.questions = action.payload;
    },
    updateQuestionsSlice: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...question };
        }
      });
      state.questionUpdated = true;
    },
    deleteQuestionList: (state, action) => {
      state.questions = state.questions.filter(
        (item) => item.id !== action.payload
      );
    },
    setQuestionpdated: (state, action) => {
      state.questionUpdated = action.payload;
    },
  },
});

export const { setQuestionsList, updateQuestionsSlice, deleteQuestionList, setQuestionpdated } =
  creerquestionSlice.actions;
