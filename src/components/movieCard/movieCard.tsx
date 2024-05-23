import { ActionIcon, Flex, Image, Paper, Text, Title } from '@mantine/core';
import NextImage from 'next/image';
import { Movie } from '@/types/interfaces';
import { useGetGenresQuery } from '@/lib/api/endpoints/genres';
import Link from 'next/link';
import useModal from '@/lib/hooks/useModal';
import { useAppSelector } from '@/lib/hooks/storeHooks';
import StarIcon from '../../assets/star';
import styles from './movieCard.module.scss';
import NoPoster from '../noPoster/noPoster';
import MovieCardTable from './movieCardTable';

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
    runtime,
    budget,
    revenue,
  } = movie;

  const { data, isLoading, error } = useGetGenresQuery(null);

  let genresTitles = [];

  if (genre_ids) {
    genresTitles = genre_ids.map((genreId) => {
      if (data) {
        const foundGenre = data.genres.find(
          (dataGenre: { id: number; name: string }) => dataGenre.id === genreId,
        );
        return foundGenre.name;
      }
      return undefined;
    });
  } else if (genres) {
    genresTitles = genres.map((genre) => genre.name);
  }

  const { toggle, setMovie } = useModal();
  const ratedMovies = useAppSelector((state) => state.ratedMoviesSlice.movies);
  const foundInRated = ratedMovies.find(
    (ratedMovie) => ratedMovie.id === movie.id,
  );

  return (
    <Paper
      radius="12px"
      component={Link}
      href={`/${id}`}
      className={styles.card}
    >
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : (
        <div className={styles.card__wrapper}>
          <div>
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
                sizes="17vw"
                blurDataURL={poster_path}
                className={styles.image}
              />
            ) : (
              <NoPoster />
            )}
          </div>

          <section className={styles.cardInfo}>
            <Flex justify="space-between" align="flex-start">
              <div className={styles.cardInfo__top}>
                <Title order={3} size="h4" fz="20px" fw="600" c="purple.5">
                  {title}
                </Title>

                {release_date && (
                  <>
                    {release_date?.length > 0 && (
                      <Text c="gray.6">
                        {new Date(release_date).getFullYear()}
                      </Text>
                    )}
                  </>
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

              <Flex gap={4} align="center">
                <ActionIcon
                  variant="transparent"
                  onClick={(e) => {
                    e.preventDefault();
                    setMovie(movie);
                    toggle();
                  }}
                >
                  <StarIcon
                    color={foundInRated !== undefined ? 'purple' : 'gray'}
                  />
                </ActionIcon>
                {foundInRated !== undefined ? (
                  <Text fw={600}>{foundInRated.userRate}</Text>
                ) : (
                  ''
                )}
              </Flex>
            </Flex>
            <MovieCardTable
              runtime={runtime}
              release_date={release_date}
              budget={budget}
              revenue={revenue}
              genres={genresTitles}
            />
          </section>
        </div>
      )}
    </Paper>
  );
}
