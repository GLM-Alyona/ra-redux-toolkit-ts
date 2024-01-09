import { useAppDispatch, useAppSelector } from "../../../../hooks/hooks"
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Films } from "../../../../redux/slices/filmsSlice";
import { addFilm } from "../../../../redux/slices/filmsSlice"
import { Link } from "react-router-dom";

export default function FilmsList() {
    const { items, favorite } = useAppSelector(state => state.films);

    const dispatch = useAppDispatch();

    const imageBodyTemplate = (item: Films) => {
        return <Link to={`/ra-redux-toolkit-ts/film-card/${item.imdbID}`}><img src={item.Poster} alt={item.Title} width="64px" className="shadow-4"/></Link>;
    };

    const onSelectionChange = (event: DataTableSelectionChangeEvent<Films[]>) => {
        const value = event.value as Films[];

        dispatch(addFilm(value))
    };
    console.log(items)
    console.log(favorite)
    return (
        <div className="card">
            <DataTable value={items} size={"small"} sortField="price" sortOrder={-1} tableStyle={{ minWidth: '40rem' }} onSelectionChange={onSelectionChange} selection={favorite!}>
                <Column header="Постер" body={imageBodyTemplate} style={{ width: '20%' }}/>
                <Column field="Title" header="Название" sortable style={{ width: '55%' }}></Column>
                <Column field="Type" header="Тип" sortable style={{ width: '10%' }}></Column>
                <Column field="Year" header="Год" sortable style={{ width: '10%' }}></Column>
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
            </DataTable>
        </div>
    );
}