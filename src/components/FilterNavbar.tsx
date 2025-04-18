'use client';

import { useEffect, useState } from 'react';
import { fetchGenres, fetchProviders, fetchMovies } from '../lib/tmdb';

interface Genre {
    id: number;
    name: string;
}

interface Provider {
    provider_id: number;
    provider_name: string;
}

export default function FilterNavbar() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>('popularity.desc');
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const loadFilters = async () => {
            setGenres(await fetchGenres());
            setProviders(await fetchProviders());
        };
        loadFilters();
    }, []);

    const handleFetch = async () => {
        const params: Record<string, any> = { sort_by: sortBy };
        if (selectedGenre) params.with_genres = selectedGenre;
        if (selectedProvider) params.with_watch_providers = selectedProvider;
        if (year) params.primary_release_year = year;
        if (rating) params['vote_average.gte'] = rating;

        const results = await fetchMovies(params);
        setMovies(results);
    };

    return (
        <div className="p-4 bg-[#1b1d1f] text-white min-h-screen">
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <div>
                    <label className="mr-1">Genre:</label>
                    <select className="bg-[#2a2c2f] p-2 rounded"
                            onChange={(e) => setSelectedGenre(Number(e.target.value))}
                            value={selectedGenre || ''}>
                        <option value="">All</option>
                        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="mr-1">Service:</label>
                    <select className="bg-[#2a2c2f] p-2 rounded"
                            onChange={(e) => setSelectedProvider(Number(e.target.value))}
                            value={selectedProvider || ''}>
                        <option value="">All</option>
                        {providers.map(p => <option key={p.provider_id} value={p.provider_id}>{p.provider_name}</option>)}
                    </select>
                </div>

                <div>
                    <label className="mr-1">Year:</label>
                    <input type="number"
                           className="bg-[#2a2c2f] p-2 rounded w-20"
                           value={year || ''}
                           onChange={(e) => setYear(Number(e.target.value))} />
                </div>

                <div>
                    <label className="mr-1">Rating ≥</label>
                    <input type="number"
                           className="bg-[#2a2c2f] p-2 rounded w-16"
                           value={rating || ''}
                           onChange={(e) => setRating(Number(e.target.value))} />
                </div>

                <div>
                    <label className="mr-1">Other (Sort):</label>
                    <select className="bg-[#2a2c2f] p-2 rounded"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}>
                        <option value="popularity.desc">Popularity Desc</option>
                        <option value="vote_average.desc">Rating Desc</option>
                        <option value="release_date.desc">Newest First</option>
                    </select>
                </div>

                <button
                    onClick={handleFetch}
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                >
                    Fetch Movies
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movies.map(movie => (
                    <div key={movie.id} className="bg-[#2a2c2f] p-2 rounded shadow">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded"
                            />
                        )}
                        <p className="mt-2 text-center text-sm">{movie.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
