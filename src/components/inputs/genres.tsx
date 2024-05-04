import { useGetGenresQuery } from '@/lib/api/endpoints/genres';
import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';
import ArrowSvg from '@/assets/arrow';
import styles from './genres.module.scss';

export default function Genres() {
  const { data, isLoading, error } = useGetGenresQuery(null);

  const [genres, setGenres] = useState();
  const [arrowState, setArrowState] = useState<'up' | 'down'>('down');

  useEffect(() => {
    if (data) {
      setGenres(
        data.genres.map((genre: { id: number; name: string }) => ({
          value: genre.id.toString(),
          label: genre.name,
        })),
      );
    }
  }, [data, isLoading, error]);

  return (
    <>
      {data && (
        <MultiSelect
          label="Genres"
          placeholder="Select genre"
          data={genres}
          comboboxProps={{
            transitionProps: { transition: 'pop', duration: 200 },
          }}
          classNames={{
            input: styles.genresInput,
            section: styles.genresSection,
          }}
          rightSection={
            <ArrowSvg
              color={
                arrowState === 'up'
                  ? 'var(--mantine-color-purple-5)'
                  : 'var(--mantine-color-gray-5)'
              }
              styles={{
                transform:
                  arrowState === 'up' ? 'rotate(180deg)' : 'rotate(0deg)',
                transitionDuration: '200ms',
              }}
            />
          }
          onDropdownOpen={() => setArrowState('up')}
          onDropdownClose={() => setArrowState('down')}
        />
      )}
    </>
  );
}
