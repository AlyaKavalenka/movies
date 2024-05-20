import getYearsRange from '@/utils/getYearsRange';
import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import ArrowSvg from '@/assets/arrow';
import { useAppDispatch } from '@/lib/hooks/storeHooks';
import { setReleaseYearFilter } from '@/lib/reducers/moviesFiltersSlice';
import styles from './select.module.scss';

export default function ReleaseYear() {
  const [arrowState, setArrowState] = useState<'up' | 'down'>('down');
  const [value, setValue] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setReleaseYearFilter(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Select
      label="Release year"
      placeholder="Select release year"
      data={getYearsRange({ from: 1824, to: new Date().getFullYear() }, 'new')}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 },
      }}
      classNames={{
        input: styles.selectInput,
        option: styles.option,
      }}
      searchable
      rightSection={
        <ArrowSvg
          color={
            arrowState === 'up'
              ? 'var(--mantine-color-purple-5)'
              : 'var(--mantine-color-gray-5)'
          }
          styles={{
            transform: arrowState === 'up' ? 'rotate(180deg)' : 'rotate(0deg)',
            transitionDuration: '200ms',
          }}
        />
      }
      onDropdownOpen={() => setArrowState('up')}
      onDropdownClose={() => setArrowState('down')}
      onChange={setValue}
      maw={284}
      miw={161}
      flex="1 0 0"
    />
  );
}
