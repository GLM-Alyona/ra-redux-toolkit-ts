import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { filmsList } from "../thunks/filmsListThunk";
import { filmCard } from "../thunks/filmCardThunk";
import { userStorage } from "../../userStorage/userStorage";

export type Films = {
    Poster: string;
    Title: string;
    Type: string;
    Year: string;
    imdbID: string;
};

type Rating = {
    Source: string;
    Value: string;
}

export type FilmCard = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};

type FilmsState = {
    items: Films[];
    favorite: Films[];
    film: FilmCard | null;
    searchInput: string;
    showMore: boolean;
    loading: boolean;
    error: string | null;
};

userStorage.initialStorage()

const loadStorage = userStorage.storageLoadFavorite();
console.log(loadStorage.favorite)

const initialState: FilmsState = {
    items: [],
    favorite: loadStorage.favorite,
    film: null,
    searchInput: '',
    showMore: false,
    loading: false,
    error: null,
}

const filmsSlice = createSlice({
    name: 'films',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(filmsList.pending, (state) => {
                state.loading = true;
            })
            .addCase(filmsList.fulfilled, (state, action) => {
                state.loading = false;

                if (!state.showMore) {
                    state.showMore = true;
                    state.items = [];
                }

                if (action.payload.Search) {
                    action.payload.Search.forEach(item => state.items.push(item));
                }
            })
            .addCase(filmCard.pending, (state) => {
                state.loading = true;
            })
            .addCase(filmCard.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload) {
                    state.film = action.payload;
                }  
            })
        // [filmsList.pending]: (state: FilmsState) => {
        //     state.loading = true;
        // },
        // [filmsList.fulfilled]: (state: FilmsState, action: PayloadAction<Films[]>) => {
        //     state.loading = false;
        //     action.payload.forEach(item => state.items.push(item));
        // },
        // [filmsList.rejected]: (state: FilmsState, action: PayloadAction<Films[]>) => {
        //     state.loading = false;
        //     state.error = action.error.message;
        // }
    },
    reducers: {
        searchFilms(state, action) {
            state.searchInput = action.payload;
            state.showMore = false;
        },
        addFilm(state, action: PayloadAction<Films[]>) {
            console.log(action)
            state.favorite = action.payload;
            userStorage.addFavorite({favorite: state.favorite});
        },
        removeFilm(state, action: PayloadAction<string>) {
            state.favorite = state.favorite.filter(item => item.imdbID !== action.payload);
            userStorage.addFavorite({favorite: state.favorite})
        },
    },
})

export const { searchFilms, addFilm, removeFilm } = filmsSlice.actions;
export default filmsSlice.reducer;