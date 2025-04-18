"use client";

import {useRef} from "react";
import {MovieCard} from "@/components/MovieCard";
import {media} from "@/types/tmdb";
import {ChevronLeft, ChevronRight} from "lucide-react";

export const MovieList = ({title, medias}: { title: string; medias: media[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const amount = scrollRef.current.clientWidth * 0.8;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative px-4 py-6">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <hr className="my-4 border-t border-gray-300"/>

            <div className="relative">
                {/* Left Arrow */}
                <button
                    onClick={() => scroll("left")}
                    className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
                >
                    <ChevronLeft/>
                </button>

                {/* Scrollable Movie List */}
                <div
                    ref={scrollRef}
                    className="flex space-x-4 overflow-x-auto no-scrollbar scroll-smooth"
                >
                    {medias.map((movie) => (
                        <MovieCard key={movie.id} movie={movie}/>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => scroll("right")}
                    className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-80 text-white p-2 rounded-full"
                >
                    <ChevronRight/>
                </button>
            </div>
        </div>
    );
}


