import {MovieList} from "@/components/MovieList";
import {fetchTopRatedMovieORTV, fetchTrendingMoviesOrTVShows} from "@/lib/tmdb";
import {MediaType} from "@/common/enums/media-type.enum";
import BrowseFilterBar from "@/components/BrowseFilterBar";

export default async function HomePage() {
    const trendingMovies = await fetchTrendingMoviesOrTVShows(MediaType.MOVIE);
    const trendingTVShows = await fetchTrendingMoviesOrTVShows(MediaType.TV);
    const topRatedMovies   = await fetchTopRatedMovieORTV(MediaType.MOVIE);
    const topRatedTVShows   = await fetchTopRatedMovieORTV(MediaType.TV);


    return (
        <main>
            <div className={"h-full p-8 "}>
                <BrowseFilterBar></BrowseFilterBar>
                <MovieList title="Trending movies" medias={trendingMovies} />
                <MovieList title="Trending tv shows" medias={trendingTVShows} />
                <MovieList title="Top rated tv shows" medias={topRatedTVShows} />
                <MovieList title="Top rated movies" medias={topRatedMovies} />
                <MovieList title="Top rated tv shows" medias={topRatedTVShows} />
            </div>

        </main>
    );
}
