
"use client";
import { useState } from "react";
import FilterDropdown from "./FilterDropdown";

const mockOptions = {
    Year: ["2024", "2023", "2022"],
    Rating: ["G", "PG", "PG-13", "R"],
    Popular: ["This Week", "This Month", "All Time"],
    Genre: ["Action", "Drama", "Comedy"],
    Service: ["Netflix", "Prime", "Disney+"],
    Other: ["Top Rated", "Trending"],
};

export default function BrowseFilterBar() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSelect = (category: string, value: string) => {
        console.log(`${category}: ${value}`);
        // TODO: hook into API or state
    };

    return (
        <div className="flex flex-wrap justify-between items-center gap-4 bg-[#0f172a] p-4 rounded-lg text-white shadow-sm">
            <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm tracking-widest text-gray-400">BROWSE BY</span>
                {Object.keys(mockOptions).map((category) => (
                    <FilterDropdown
                        key={category}
                        label={category}
                        options={mockOptions[category as keyof typeof mockOptions]}
                        onSelect={(value) => handleSelect(category, value)}
                    />
                ))}
            </div>

            <div className="flex items-center bg-slate-800 rounded-md px-3 py-1">
                <span className="text-sm mr-2 text-gray-400">FIND A FILM</span>
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none text-sm text-white placeholder-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    );
}
