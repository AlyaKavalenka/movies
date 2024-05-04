import getYearsRange from '@/utils/getYearsRange';
import { Select } from '@mantine/core';
import { useState } from 'react';
import ArrowSvg from '@/assets/arrow';
import styles from './select.module.scss';

export default function ReleaseYear() {
  const [arrowState, setArrowState] = useState<'up' | 'down'>('down');

  return (
    <Select
      label="Genres"
      placeholder="Select genre"
      data={getYearsRange({ from: 1824, to: new Date().getFullYear() }, 'new')}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 },
      }}
      classNames={{
        input: styles.selectInput,
      }}
      searchable
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
    />
  );
}
