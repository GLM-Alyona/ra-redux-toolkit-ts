import { createAsyncThunk } from "@reduxjs/toolkit";
import { FilmCard } from "../slices/filmsSlice";

export const filmCard = createAsyncThunk<FilmCard, string, { rejectValue: string }>('filmCard', async (params, { rejectWithValue }) => {

    const response = await fetch(`https://www.omdbapi.com/?apikey=6ee14aa5${params}`);

    if (!response.ok) {
        return rejectWithValue('Server Error!')
    }

    const responseItems = response.json()
    
    return responseItems;
})