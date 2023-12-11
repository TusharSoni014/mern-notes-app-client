import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { handleError } from "../../utils/handleError";
import axiosClient from "../../utils/axiosClient";

export const fetchAllNotes = createAsyncThunk("fetchAllNotes", async () => {
  try {
    const response = await axiosClient.get("/user/my-notes");
    const allNotes = response.data.notes;
    return allNotes;
  } catch (error) {
    handleError(error);
  }
});

const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    allNotes: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNotes.fulfilled, (state, action) => {
        state.allNotes = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllNotes.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default notesSlice.reducer;
