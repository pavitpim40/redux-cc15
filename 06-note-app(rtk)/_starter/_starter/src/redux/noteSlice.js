import { createSlice } from '@reduxjs/toolkit';

// Slice == Action + Reducer
// NoteSlice = NoteAction + NoteReducer

// ชื่อ State
const initialState = {
  n2: [],
};

const noteSlice = createSlice({
  // ชื่อ Slice
  name: 'n3', // type : n3/addNote, type : n3/deleteNote
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNotes = [...state.notes, action.payload];
      return { notes: newNotes };
    },
  },
});

// AutoGenerate ActionCreator ==> noteSlice.actions
export const { addNote } = noteSlice.actions;
// dispatch(addNote(note))

// AutoGenerate NoteReducer ให้ด้วย
const noteReducer = noteSlice.reducer;
export default noteReducer;
