import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}
const UpdateMovie = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);

    const {id} = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then((res) => {
            setMovie(res.data)
        })
        .catch((err) => console.log(err));
    }, [id])

    const handleChange = e => {
        e.persist();
        let value = e.target.value

        setMovie({
            ...movie,
            [e.target.name] : value
        })
    };

    const handeSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then((res) => {
                setMovie(res.data);
                push(`/movies/${id}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handeSubmit}>
                <input
                    type='text'
                    name="title"
                    onChange={handleChange}
                    value={movie.title}
                />
                <input
                    type="text"
                    name="director"
                    onChange={handleChange}
                    value={movie.director}
                />
                <input
                    type="text"
                    name="metascore"
                    onChange={handleChange}
                    value={movie.metascore}
                />
                <input
                    type='text'
                    name="stars"
                    onChange={handleChange}
                    value={movie.stars}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}
export default UpdateMovie;