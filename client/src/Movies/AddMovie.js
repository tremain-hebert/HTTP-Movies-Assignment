import React, { useState } from 'react';
import axios from 'axios';

const initialNewMovie = {
    title:'',
    director:'',
    metascore:'',
    stars:[]
}

const AddMovie = () => {
    const [newMovie, setNewMovie] = useState(initialNewMovie);

    const handleChange = e => {
        e.persist();
        let value = e.target.value

        setNewMovie({
            ...newMovie,
            [e.target.name] : value
        })
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <h1>Add Movie</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    value={newMovie.name}
                />
                <input
                    type='text'
                    name='director'
                    onChange={handleChange}
                    value={newMovie.director}
                />
                <input
                    type='text'
                    name='metascore'
                    onChange={handleChange}
                    value={newMovie.metascore}
                />
                <input
                    type='string'
                    name="stars"
                    onChange={handleChange}
                    value={newMovie.stars}
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}
export default AddMovie;