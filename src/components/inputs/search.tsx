'use client';

import { Button, Image, TextInput, TextInputProps } from '@mantine/core';
import NextImage from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from '@mantine/hooks';
import searchIcon from '../../../public/images/svg/search-icon.svg';
import styles from './search.module.scss';

export default function Search(props: TextInputProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Search movie title"
      rightSectionWidth={110}
      leftSection={
        <Image component={NextImage} src={searchIcon} alt="search" />
      }
      rightSection={
        <Button
          variant="filled"
          color="purple.5"
          radius="md"
          fz={14}
          size="compact-md"
          classNames={{ root: styles.btn }}
          px={20}
        >
          Search
        </Button>
      }
      classNames={{ input: styles.searchTextInput }}
      {...props}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}
