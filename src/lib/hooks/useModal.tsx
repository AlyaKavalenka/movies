import { isOpenModalValue } from '@/lib/reducers/isOpenModalSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/storeHooks';

export default function useModal() {
  const isOpen = useAppSelector((state) => state.isOpenModalSlice.value);
  const dispatch = useAppDispatch();

  function toggle() {
    dispatch(isOpenModalValue(!isOpen));
  }

  return { toggle };
}
