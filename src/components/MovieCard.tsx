"use client";

import {media} from "@/types/tmdb";

export function MovieCard({movie}: { movie: media }) {
    return (
        <div className="min-w-[200px] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
            />
            <div className="p-3">
                <h2 className="text-white font-semibold text-lg truncate">{movie.title}</h2>
                <p className="text-gray-400 text-sm">{movie.vote_average}/10</p>
            </div>
        </div>
    );
}

