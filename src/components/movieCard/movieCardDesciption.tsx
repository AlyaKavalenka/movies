import { ProductionCompany, Video } from '@/types/interfaces';
import { Divider, Flex, Image, Paper, Stack, Text } from '@mantine/core';
import NextImage from 'next/image';
import clapperboard from '../../../public/images/svg/clapperboard.svg';
import styles from './movieCard.module.scss';

interface MovieCardDescriptionProps {
  video: Video | undefined;
  overview: string | undefined;
  productionCompanies: ProductionCompany[] | undefined;
}

export default function MovieCardDescription(props: MovieCardDescriptionProps) {
  const { video, overview, productionCompanies } = props;

  return (
    <Paper p={24} radius={12}>
      <Stack gap={20}>
        {video && (
          <Stack>
            <Text fw={700} lh="20px" fz="20px">
              Trailer
            </Text>
            <iframe
              src={`https://www.${video.site}.com/embed/${video.key}`}
              title={video.name}
              className={styles.cardDescription__video}
            ></iframe>
          </Stack>
        )}
        {overview && (
          <>
            <Divider />
            <Stack>
              <Text fw={700} lh="20px" fz="20px">
                Description
              </Text>
              <Text lh="140%">{overview}</Text>
            </Stack>
          </>
        )}
        {productionCompanies ? (
          <>
            {productionCompanies.length > 0 ? (
              <>
                <Divider />
                <Stack>
                  <Text fw={700} lh="20px" fz="20px">
                    Production
                  </Text>
                  <Stack gap={12}>
                    {productionCompanies.map((company) => (
                      <Flex key={company.id} gap={8} align="center">
                        <div
                          className={styles.cardDescription__companyLogoWrapper}
                        >
                          <Image
                            component={NextImage}
                            src={company.logo_path || clapperboard}
                            alt="logo"
                            width={0}
                            height={0}
                            w="100%"
                            h="auto"
                            sizes="100vw"
                            loading="lazy"
                            priority={false}
                            fit="contain"
                          />
                        </div>
                        <Text fw={700} lh="140%">
                          {company.name}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
              </>
            ) : (
              ''
            )}
          </>
        ) : (
          ''
        )}
      </Stack>
    </Paper>
  );
}
