import { useGetGenresQuery } from '@/lib/api/endpoints/genres';
import { Image, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import arrowSvg from '../../../public/images/svg/arrow.svg';
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
        <Select
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
            <Image
              component={NextImage}
              src={arrowSvg}
              alt="arrow"
              style={{
                transform:
                  arrowState === 'up' ? 'rotate(180deg)' : 'rotate(360deg)',
              }}
            />
          }
          clearable
          onDropdownOpen={() => setArrowState('up')}
          onDropdownClose={() => setArrowState('down')}
        />
      )}
    </>
  );
}
