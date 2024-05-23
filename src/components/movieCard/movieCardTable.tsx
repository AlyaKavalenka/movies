'use client';

import getTimeFromMins from '@/utils/getTimeFromMins';
import { NumberFormatter, Table, TableTd, TableTr } from '@mantine/core';
import { usePathname } from 'next/navigation';
import styles from './movieCard.module.scss';

interface MovieCardTableProps {
  runtime: number | undefined;
  release_date: string | undefined;
  budget: number | undefined;
  revenue: number | undefined;
  genres: string[] | undefined;
}

export default function MovieCardTable(props: MovieCardTableProps) {
  const { runtime, release_date, budget, revenue, genres } = props;

  const pathname = usePathname();

  const elements = [
    { name: 'Duration', value: runtime ? getTimeFromMins(runtime) : undefined },
    {
      name: 'Premiere',
      value: release_date
        ? new Date(release_date).toLocaleDateString('en', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
        : undefined,
    },
    {
      name: 'Budget',
      value: budget ? (
        <NumberFormatter value={budget} thousandSeparator prefix="$" />
      ) : undefined,
    },
    {
      name: 'Gross worldwide',
      value: revenue ? (
        <NumberFormatter value={revenue} thousandSeparator prefix="$" />
      ) : undefined,
    },
    {
      name: 'Genres',
      value: genres ? (
        <span className={styles.genresText}>{genres?.join(', ')}</span>
      ) : undefined,
    },
  ];

  const row = (
    element:
      | {
          name: string;
          value: string | undefined;
        }
      | {
          name: string;
          value: JSX.Element | undefined;
        },
  ) => (
    <TableTr key={element.name} fz={16}>
      <TableTd
        c="gray.6"
        lh="20px"
        pl={0}
        pr={8}
        miw="0"
        className={styles.table__rowName}
      >
        {element.name}
      </TableTd>
      <TableTd lh="20px" px={0} className={styles.table__rowValue}>
        {element.value}
      </TableTd>
    </TableTr>
  );

  const rows = elements.map((element) => {
    if (element.value) {
      if (pathname === '/' || pathname === '/rated') {
        if (element.name === 'Genres') {
          return row(element);
        }
      } else {
        return row(element);
      }
    }
    return '';
  });

  return (
    <Table withRowBorders={false} className={styles.table}>
      {rows}
    </Table>
  );
}
