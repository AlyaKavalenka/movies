import { Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import ArrowSvg from '@/assets/arrow';
import { useAppDispatch } from '@/lib/hooks/storeHooks';
import { setSortBy } from '@/lib/reducers/moviesFiltersSlice';
import { SortByType } from '@/types/interfaces';
import styles from './select.module.scss';

export default function SortBy() {
  const [arrowState, setArrowState] = useState<'up' | 'down'>('down');
  const options: { value: SortByType; label: string }[] = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Most Rated' },
    { value: 'vote_average.asc', label: 'Least Rated' },
    { value: 'vote_count.desc', label: 'Most Voted' },
    { value: 'vote_count.asc', label: 'Least Voted' },
  ];

  const [value, setValue] = useState<string | null>(options[0].value);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSortBy(value || 'popularity.desc'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Select
      label="Sort by"
      data={options}
      defaultValue={options[0].value}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 },
      }}
      classNames={{
        input: styles.selectInput,
        option: styles.option,
      }}
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
      value={value}
    />
  );
}
