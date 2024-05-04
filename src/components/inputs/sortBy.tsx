import { Select } from '@mantine/core';
import { useState } from 'react';
import ArrowSvg from '@/assets/arrow';
import styles from './select.module.scss';

export default function SortBy() {
  const [arrowState, setArrowState] = useState<'up' | 'down'>('down');

  const options = [
    'Most popular',
    'Least Popular',
    'Most Rated',
    'Least Rated',
    'Most Voted',
    'Least Voted',
  ];

  return (
    <Select
      label="Sort by"
      data={options}
      defaultValue={options[0]}
      comboboxProps={{
        transitionProps: { transition: 'pop', duration: 200 },
      }}
      classNames={{
        input: styles.selectInput,
      }}
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
