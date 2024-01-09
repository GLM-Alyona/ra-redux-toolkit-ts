import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks";
import { useState, useEffect } from "react";
import { filmsList } from '../../../../redux/thunks/filmsListThunk';

export default function ButtonMore() {
    const [counter, setCounter] = useState<number>(2);
    const { loading, searchInput, showMore } = useAppSelector(state => state.films);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!showMore) {
            setCounter(1)
        } 
    }, [showMore])

    const handleClickMore = () => {
        dispatch(filmsList('&s=' + searchInput + `&page=${counter}`));

        setCounter(count => count + 1);
    };

    return (
        <div className="card flex flex-wrap justify-content-center gap-3">
            <Button label="Submit" icon="pi pi-check" loading={loading} onClick={handleClickMore} />
        </div>
    )
}