import { Text } from '@mantine/core';

interface MovieCardGenresProps {
  genres: string[];
}

export default function MovieCardGenres(props: MovieCardGenresProps) {
  const { genres } = props;

  return (
    <>
      {genres.length > 0 && (
        <Text c="gray.6">
          Genres{' '}
          <Text c="black" span inherit>
            {genres.join(', ')}
          </Text>
        </Text>
      )}
    </>
  );
}
