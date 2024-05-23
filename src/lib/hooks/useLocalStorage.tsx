import { setMoviesInitialState } from '../reducers/ratedMoviesSlice';
import { useAppDispatch, useAppSelector } from './storeHooks';

export default function useLocalStorage(initialValue: []) {
  const dispatch = useAppDispatch();
  const ratedMovies = useAppSelector((state) => state.ratedMoviesSlice.movies);

  function synchronize() {
    if (ratedMovies.length === 0) {
      const ratedMoviesFromStorage = () => {
        try {
          const item = window.localStorage.getItem('ratedMovies');
          return item ? JSON.parse(item) : initialValue;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          return initialValue;
        }
      };
      dispatch(setMoviesInitialState(ratedMoviesFromStorage()));
    }
  }

  return { synchronize };
}
