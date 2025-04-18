import axios from 'axios';
import {media} from "@/types/tmdb";
import {MediaType } from "@/common/enums/media-type.enum"

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.BASE_URL;

const tmdb = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: "application/json",
    },
    params: {
        api_key: API_KEY,
    },
});

export const fetchTrendingMoviesOrTVShows = async (platform: MediaType): Promise<media[]> => {
    try {
        const res = await tmdb.get(`/trending/${platform}/day`);
        return res.data.results;
    } catch (error) {
        console.error(`Failed to fetch trending ${platform}:`, error);
        return []; // or throw error depending on how you want to handle it upstream
    }
};

export const fetchTopRatedMovieORTV = async (platform: MediaType): Promise<media[]> => {
    try {
        const res = await tmdb.get(`/discover/${platform}`, {
            params: {
                include_adult: true,
                language: "en-US",
                page: 1,
                sort_by: "vote_average.desc",
                "vote_count.gte": 200,
            },
        });

        return res.data.results;
    } catch (error) {
        console.error(`Failed to fetch top-rated ${platform}:`, error);
        return []; // or throw error, based on your use case
    }
};


export const fetchGenres = async () => {
    const res = await tmdb.get('/genre/movie/list');
    return res.data.genres;
};

export const fetchProviders = async () => {
    const res = await tmdb.get('/watch/providers/movie', {
        params: { watch_region: 'US' }
    });
    return res.data.results;
};

export const fetchMovies = async (params: Record<string, any>) => {
    const res = await tmdb.get('/discover/movie', { params: { ...params, api_key: API_KEY } });
    return res.data.results;
};


