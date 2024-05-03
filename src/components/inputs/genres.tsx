import { useGetGenresQuery } from '@/lib/api/endpoints/genres';
import { MultiSelect } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function Genres() {
  const { data, isLoading, error } = useGetGenresQuery(null);

  const [genres, setGenres] = useState();

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
        />
      )}
    </>
  );
}
