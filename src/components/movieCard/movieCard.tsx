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
import StarIcon from '../../assets/star';
import styles from './movieCard.module.scss';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie } = props;
  const {
    title,
    poster_path,
    release_date,
    vote_average,
    vote_count,
    genre_ids,
  } = movie;

  const { data, isLoading, error } = useGetGenresQuery(null);

  return (
    <Grid.Col span={1}>
      <Paper p="24px" radius="12px">
        {error ? (
          <>Oh no, there was an error</>
        ) : isLoading ? (
          <>Loading...</>
        ) : (
          <Grid gutter="md">
            <Grid.Col span="content">
              <Image
                component={NextImage}
                src={poster_path}
                alt="movie poster"
                width={0}
                height={0}
                w="auto"
                h="170"
                loading="lazy"
                priority={false}
                placeholder="blur"
                sizes="100vw"
                blurDataURL={poster_path}
              />
            </Grid.Col>
            <Grid.Col span="auto" py={0}>
              <section className={styles.cardWStar}>
                <article className={styles.cardInfo}>
                  <div className={styles.cardInfo__top}>
                    <Title order={3} size="h4" fz="20px" fw="600" c="purple.5">
                      {title}
                    </Title>
                    <Text c="gray.6">
                      {new Date(release_date).getFullYear()}
                    </Text>
                    <Flex gap="8px" align="center" wrap="wrap">
                      <Flex gap="4px" align="center" wrap="wrap">
                        <StarIcon color="yellow" />
                        <Text fw="600">
                          {Math.round(vote_average * 10) / 10}
                        </Text>
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
                  <Text c="gray.6">
                    Genres{' '}
                    <Text c="black" span inherit>
                      {genre_ids
                        .map((genreId) => {
                          const foundGenre = data.genres.find(
                            (dataGenre: { id: number; name: string }) =>
                              dataGenre.id === genreId,
                          );
                          return foundGenre.name;
                        })
                        .join(', ')}
                    </Text>
                  </Text>
                </article>
                <ActionIcon variant="transparent">
                  <StarIcon color="gray" />
                </ActionIcon>
              </section>
            </Grid.Col>
          </Grid>
        )}
      </Paper>
    </Grid.Col>
  );
}
