import { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks"
import { filmCard } from "../../../redux/thunks/filmCardThunk";
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';

export default function FilmCard() {
    const { film } = useAppSelector(state => state.films)
    const dispatch = useAppDispatch();
    const { imdbID } = useParams<string>()

    useEffect(() => {
        if (imdbID) {
            dispatch(filmCard('&i=' + imdbID))
        }
    }, [])

    return (

        <Card title={film?.Title} >
            <div className="card-box">
                <img src={film?.Poster} alt={film?.Title} width="240px" className="shadow-4"/>

                <Divider className="vertical" layout="vertical" />
                <div>
                    <div>
                        <h5>Режисер</h5>
                        {film?.Director}
                    </div>
                    <Divider />
                    <div>
                        <h5>В главных ролях</h5>
                        {film?.Actors}
                    </div>
                    <Divider />
                    <div>
                        <h5>Релиз</h5>
                        {film?.Released}
                    </div>
                    <Divider />
                    <div>
                        <h5>Продолжительность</h5>
                        {film?.Runtime}
                    </div>
                </div>
                <Divider className="vertical" layout="vertical" />
                <div>
                    <div>
                        <h5>Сценарий</h5>
                        {film?.Writer}
                    </div>
                    <Divider />
                    <div>
                        <h5>Страна</h5>
                        {film?.Country}
                    </div>
                    <Divider />
                    <div>
                        <h5>Рейтинг</h5>
                        {film?.imdbRating}
                    </div>
                    <Divider />
                    <div>
                        <h5>Жанр</h5>
                        {film?.Genre}
                    </div>
                </div>
            </div>
            <Divider />
            <div className="card-box">
                <div className="card-plot">
                    <h5 className="title-plot">Описание</h5>
                    {film?.Plot}
                </div>
                <Divider className="vertical" layout="vertical" />
                <div>
                    <div>
                        <h5>Сборы</h5>
                        {film?.BoxOffice}
                    </div>
                    <Divider />
                    <div>
                        <h5>Награды</h5>
                        {film?.Awards}
                    </div>
                </div>
            </div>
        </Card>
    )
}