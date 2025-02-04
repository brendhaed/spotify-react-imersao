import React, { useState, useEffect } from 'react';
import search from '../../assets/icons/icons/search.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import './search.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [artists, setArtists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestApi = async (searchTerm) => {
        setIsLoading(true);
        try {
            const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
            const response = await fetch(url);
            const result = await response.json();
            displayResults(result, searchTerm);
        } catch (err) {
            setError('Erro ao carregar os resultados');
            setIsLoading(false);
        }
    };

    const displayResults = (result, searchTerm) => {
        const filteredArtists = result.filter(artist =>
            artist.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setArtists(filteredArtists);
        setIsLoading(false);
    };

    useEffect(() => {
        if (query.trim() !== '') {
            requestApi(query);
        } else {
            setArtists([]);
        }
    }, [query]);

    return (
        <div className="header__search">
            <img src={search} alt="Buscar" className='img-lupa' />
            <input
                id="search-input"
                maxLength="800"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder="O que você quer ouvir?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {isLoading && <p>Carregando...</p>}
            {error && <p>{error}</p>}

            <div className="grid-container">
                {/* Condição para exibir "Nada encontrado" ou os artistas */}
                {query.trim() !== "" && artists.length === 0 ? (
                    <p>Nada encontrado!</p>
                ) : (
                    artists.map((artist, index) => (
                        <div key={index} className="artist-card">
                            <div className="card-img">
                                <img className="artist-img" src={artist.urlImg} alt={artist.name} />
                                <div className="play">
                                    <FontAwesomeIcon icon={faPlay} />
                                </div>
                            </div>
                            <div className="card-text">
                                <span className="artist-name">{artist.name}</span>
                                <span className="artist-categorie">{artist.genre}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Search;

