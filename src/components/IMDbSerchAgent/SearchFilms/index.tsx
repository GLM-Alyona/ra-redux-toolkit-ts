import { useAppSelector } from "../../../hooks/hooks";
import ButtonMore from "./BottonMore/BottonMore";
import FilmsList from "./FilmsList/FilmsList";
import SearchForm from "./SearchForm/SearchForm";

export default function SearchFilms() {
    const { showMore } = useAppSelector(state => state.films)

    return (
        <div className="search-films">
            <SearchForm />
            <FilmsList />
            {
                showMore 
                && 
                <ButtonMore />
            }
        </div>
    )
}