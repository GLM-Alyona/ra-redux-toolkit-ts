import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Films, removeFilm } from "../../../redux/slices/filmsSlice";
import { Toolbar } from 'primereact/toolbar';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function FavoriteFilms() {
    const { favorite } = useAppSelector(state => state.films);
    const [selectedCustomers, setSelectedCustomers] = useState<Films | null>(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const imageBodyTemplate = (item: Films) => {
        return <Link to={`/ra-redux-toolkit-ts/film-card/${item.imdbID}`}><img src={item.Poster} alt={item.Title} width="64px" className="shadow-4" /></Link>
    };

    const onSelectionChange = (event: DataTableSelectionChangeEvent<Films[]>) => {
        const value = event.value as Films;

        setSelectedCustomers(value);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const deleteProduct = () => {
        setDeleteProductDialog(false);
        if (selectedCustomers) {
            dispatch(removeFilm(selectedCustomers.imdbID))
        }
        
    };

    const deleteProductDialogFooter = (
        <>
            <Button label="Нет" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Да" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </>
    );

    const confirmDeleteSelected = () => {
        setDeleteProductDialog(true);
    };

    const rightToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="Убрать из избранного" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedCustomers} />
            </div>
        );
    };
    console.log(favorite)
    return (
        <div className="card">
            <DataTable value={favorite} size={"small"} sortField="price" sortOrder={-1} tableStyle={{ minWidth: '40rem' }} onSelectionChange={onSelectionChange} selection={selectedCustomers!}>
                <Column header="" body={imageBodyTemplate} style={{ width: '20%' }}/>
                <Column field="Title" header="Название" sortable style={{ width: '55%' }}></Column>
                <Column field="Type" header="Тип" sortable style={{ width: '10%' }}></Column>
                <Column field="Year" header="Год" sortable style={{ width: '10%' }}></Column>
                <Column selectionMode="single" style={{ width: '5%' }}></Column>
            </DataTable>
            <Toolbar className="mb-4" right={rightToolbarTemplate}></Toolbar>
            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Удалить?" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {selectedCustomers && (
                        <span>
                            Точно хочешь убрать из избранного <b>{selectedCustomers.Title}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
        </div>
    )
}