import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //awil mat7il il page ijiki tableau candidat fera8
  exams: null,
  loading: true,
  examUpdated: null,
  questions: null
};

export const creerexamSlice = createSlice({
  name: "creerexamSaga",
  initialState,
  //reducers c'est un objet de fonction qui peut modifier le initial state
  reducers: {
    //wa9t 3andik parametre inti bech t7adid il valeu mte3hom ta3mil action
    setExamsSlice: (state, action) => {
      //payload ki 7ajtik b valeur tista3milha teb3a il documentation mte3 il redux
      state.exams = action.payload;
      state.loading = false;
    },
    updateExamsSlice: (state, action) => {
      state.exams = state.exams.map((exam) => {
        if (exam.id === action.payload.id) {
          return { ...action.payload };
        } else {
          return { ...exam };
        }
      });
      state.examUpdated = true
    },
    deleteExamsSlice: (state, action) => {
      state.exams = state.exams.filter((exam) => exam.id !== action.payload );
    },
    setExamUpdated: (state, action) => {
      state.examUpdated = action.payload
    },
    setQuestionsList: (state, action) => {
      state.questions = action.payload
    },
  },
});
//ay fonction tdefiniha texportiha hna

export const { setExamsSlice, updateExamsSlice, setExamUpdated, deleteExamsSlice, setQuestionsList } = creerexamSlice.actions;
