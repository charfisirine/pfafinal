import { createSlice } from "@reduxjs/toolkit";

// Utility function to safely parse JSON
const safeJSONParse = (item) => {
  try {
    return JSON.parse(item);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

const initialState = {
  user: safeJSONParse(window.localStorage.getItem("user")),
  type: window.localStorage.getItem("type") || null,
  token: window.localStorage.getItem("token") || null,
};

export const connexionSlice = createSlice({
  name: "connexion",
  initialState,
  reducers: {
    setUserSlice: (state, action) => {
      state.user = action.payload.user;
      state.type = action.payload.type;
      state.token = action.payload.token;

      if (action.payload.token) {
        window.localStorage.setItem("token", action.payload.token);
        window.localStorage.setItem(
          "user",
          JSON.stringify(action.payload.user)
        );
        window.localStorage.setItem("type", action.payload.type);
      } else {
        window.localStorage.clear();
      }
    },
  },
});

export const { setUserSlice } = connexionSlice.actions;
export default connexionSlice.reducer;
