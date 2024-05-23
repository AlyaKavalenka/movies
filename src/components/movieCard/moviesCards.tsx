import { Movie } from '@/types/interfaces';
import styles from './movieCard.module.scss';
import MovieCard from './movieCard';

interface MoviesCardsProps {
  movies: Movie[];
}

export default function MoviesCards(props: MoviesCardsProps) {
  const { movies } = props;

  return (
    <div className={styles.cards}>
      {movies.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} imageMaxWidth={119} />
        </div>
      ))}
    </div>
  );
}
