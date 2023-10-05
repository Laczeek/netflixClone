import VideoBanner from "@/components/video-banner/VideoBanner";
import MoviesContainer from "@/components/movies/MoviesContainer";
import { DUMMY_MOVIES } from "@/dummy-data";

const DUMMY_MOVIE = {
	id: 'm1',
	title: 'One Piece',
	description:
		'Calling themselves the Straw Hats, Luffy and his gang sail from island to island in search of the mysterious One Piece treasure. Of course, no adventure is smooth sailing. On their quest, the Straw Hats run into dangerous rivals who stand in their way of hitting the jackpot.',
	slug: 'one-piece',
	image:
		'https://cdn.i-scmp.com/sites/default/files/d8/images/canvas/2023/01/31/ce9f52f2-5bd4-49ca-9d71-28bc2e32878b_351db1ba.jpg',
	youtubeURL: 'https://www.youtube.com/watch?v=Ades3pQbeh8',
};

const SeriesPage = () => {
    return <section>
        <VideoBanner movie={DUMMY_MOVIE}/>

        <div className='mt-10 lg:-mt-40 container mx-auto px-4'>
				{DUMMY_MOVIES.map(movies => (
					<MoviesContainer movies={movies.movies} genre={movies.genre} />
				))}
			</div>

    </section>
}

export default SeriesPage;