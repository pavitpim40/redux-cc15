import { createSlice } from '@reduxjs/toolkit';

// Slice == Action + Reducer
// NoteSlice = NoteAction + NoteReducer

// RTK
// GOOD : ลด Overhead ในการเขียน Redux
// - Action + Reducer => Slice
// - ไม่ต้องเขียน ActionType เอง => ชื่อ slice/methodReducers
// - ไม่ต้องเขียน  ActionCreator เอง => ชื่อของ methodReducers => สร้าง ActionCretor ให้
// - ไม่ต้อง integrate DevTool , Thunk (Built-in)
// - ไม่ต้อง CombineReducer สามารถติดตั้ง reducer หลายตัวได้ที่ configureStore
// - Immer Lib
// - auto return newState

// Bad
// - ทุกอย่าง Behind The Scene (Redux Abstract ทุกอย่างให้เรา)

// ชื่อ State
const initialState = {
  notes: [],
};

const noteSlice = createSlice({
  // ชื่อ Slice
  name: 'n3', // type : n3/addNote, type : n3/deleteNote
  initialState,
  reducers: {
    addNote: (state, action) => {
      // Immutable ไม่แก้ไข state เดิม
      // const newNotes = [...state.notes, action.payload]; // Immutable
      state.notes.push(action.payload); // syntax mutable => with Immer => ทำ Immutable

      // return { notes: newNotes }; // auto return newState
    },
    deleteNote: (state, action) => {
      // Immutable way
      // const newNotes = state.notes.filter((note) => note.id !== action.payload);
      // return { notes: newNotes };

      // Mutable Way(Syntax)
      const foundedIndex = state.notes.findIndex((note) => note.id === action.payload);
      if (foundedIndex !== -1) state.notes.splice(foundedIndex, 1);
    },
  },
});

// AutoGenerate ActionCreator ==> noteSlice.actions
export const { addNote, deleteNote } = noteSlice.actions;
// dispatch(addNote(note))

// AutoGenerate NoteReducer ให้ด้วย => ติดตั้งที่ Store
const noteReducer = noteSlice.reducer;
export default noteReducer;
