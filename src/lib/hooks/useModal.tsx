import {
  isOpenModalValue,
  setClickedMovie,
} from '@/lib/reducers/isOpenModalSlice';
import { Movie } from '@/types/interfaces';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/storeHooks';

export default function useModal() {
  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);
  const dispatch = useAppDispatch();

  function setMovie(value: Movie | null) {
    dispatch(setClickedMovie(value));
  }

  function toggle() {
    dispatch(isOpenModalValue(!isOpen));
  }

  return { toggle, setMovie };
}
