import { createAsyncThunk } from "@reduxjs/toolkit";
import { Films } from "../slices/filmsSlice";


export type FilmsResponse = {
    Search: Films[];
    totalResults: string;
    Response: string;
}

export const filmsList = createAsyncThunk<FilmsResponse, string, { rejectValue: string }>('films', async (params, { rejectWithValue }) => {

    const response = await fetch(`https://www.omdbapi.com/?apikey=6ee14aa5${params}`);

    if (!response.ok) {
        return rejectWithValue('Server Error!')
    }

    const responseItems = response.json()
    
    return responseItems;
})