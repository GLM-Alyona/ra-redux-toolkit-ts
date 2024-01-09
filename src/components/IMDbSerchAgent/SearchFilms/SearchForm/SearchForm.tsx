import { AutoComplete } from 'primereact/autocomplete';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { filmsList } from '../../../../redux/thunks/filmsListThunk';
import { searchFilms } from '../../../../redux/slices/filmsSlice'

export default function SearchForm() {
    const { searchInput } = useAppSelector(state => state.films)
    const dispatch = useAppDispatch();

    // const handleChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    //     const { value } = e.currentTarget;

    //     dispatch(searchFilms(value))
    // }

    const handleSubmitSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        dispatch(filmsList('&s=' + searchInput))
    }

    return(
        <div className="card flex justify-content-center">
            <form onSubmit={handleSubmitSearchForm}>
                <AutoComplete placeholder={'Введите название фильма'} value={searchInput} onChange={(e) => dispatch(searchFilms(e.value))}/>
            </form>  
        </div>
    )
}