import {
  ActionIcon,
  Flex,
  Grid,
  Image,
  Paper,
  Text,
  Title,
} from '@mantine/core';
import NextImage from 'next/image';
import { Movie } from '@/types/interfaces';
import { useGetGenresQuery } from '@/lib/api/endpoints/genres';
import Link from 'next/link';
import StarIcon from '../../assets/star';
import styles from './movieCard.module.scss';
import NoPoster from '../noPoster/noPoster';
import MovieCardGenres from './movieCardGenres';

interface MovieCardProps {
  movie: Movie;
  imageMaxWidth: number;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie, imageMaxWidth } = props;
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    id,
    genre_ids,
    genres,
  } = movie;

  const { data, isLoading, error } = useGetGenresQuery(null);

  let genresTitles = [];

  if (genre_ids) {
    genresTitles = genre_ids.map((genreId) => {
      const foundGenre = data.genres.find(
        (dataGenre: { id: number; name: string }) => dataGenre.id === genreId,
      );
      return foundGenre.name;
    });
  } else if (genres) {
    genresTitles = genres.map((genre) => genre.name);
  }

  return (
    <Paper p="24px" radius="12px" component={Link} href={`/${id}`}>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <Grid gutter="md">
          <Grid.Col span="content">
            {poster_path ? (
              <Image
                component={NextImage}
                src={poster_path}
                alt="movie poster"
                width={0}
                height={0}
                w="auto"
                h="auto"
                maw={imageMaxWidth}
                loading="lazy"
                priority={false}
                placeholder="blur"
                sizes="100vw"
                blurDataURL={poster_path}
              />
            ) : (
              <NoPoster />
            )}
          </Grid.Col>
          <Grid.Col span="auto" py={0}>
            <section className={styles.cardWStar}>
              <article className={styles.cardInfo}>
                <div className={styles.cardInfo__top}>
                  <Title order={3} size="h4" fz="20px" fw="600" c="purple.5">
                    {title}
                  </Title>
                  {release_date?.length > 0 && (
                    <Text c="gray.6">
                      {new Date(release_date).getFullYear()}
                    </Text>
                  )}
                  <Flex gap="8px" align="center" wrap="wrap">
                    <Flex gap="4px" align="center" wrap="wrap">
                      <StarIcon color="yellow" />
                      <Text fw="600">{Math.round(vote_average * 10) / 10}</Text>
                    </Flex>
                    <Text c="gray.6">
                      (
                      {vote_count > 999
                        ? `${Math.round((vote_count * 10) / 1000) / 10}M`
                        : vote_count}
                      )
                    </Text>
                  </Flex>
                </div>
                <MovieCardGenres genres={genresTitles} />
              </article>
              <ActionIcon variant="transparent">
                <StarIcon color="gray" />
              </ActionIcon>
            </section>
          </Grid.Col>
        </Grid>
      )}
    </Paper>
  );
}
