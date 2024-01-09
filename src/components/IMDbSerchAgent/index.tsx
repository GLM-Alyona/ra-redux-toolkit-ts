import { Route, Routes } from "react-router";
import { Panel } from 'primereact/panel';
import Menu from "./Menu/Menu";
import SearchFilms from "./SearchFilms";
import FavoriteFilms from "./FavoriteFilms/FavoriteFilms";
import FilmCard from "./FilmCard/FilmCard";

export default function IMDbSearchAgent() {
    return (
        <Panel header="IMDbSerchAgent" className='main'>
            <Menu />
            <Routes>
                <Route path='/ra-redux-toolkit-ts/' element={<SearchFilms />}></Route>
                <Route path='/ra-redux-toolkit-ts/favorite' element={<FavoriteFilms />}></Route>
                <Route path='/ra-redux-toolkit-ts/film-card/:imdbID' element={<FilmCard />}></Route>

                {/* <Route path='/ra-online-store/*' element={<P404 />}></Route> */}
            </Routes>
        </Panel>
    )
}