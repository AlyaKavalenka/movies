import { Button, Image, TextInput, TextInputProps } from '@mantine/core';
import NextImage from 'next/image';
import searchIcon from '../../../public/images/svg/search-icon.svg';
import styles from './search.module.scss';

export default function Search(props: TextInputProps) {
  return (
    <TextInput
      radius="md"
      size="md"
      placeholder="Search movie title"
      rightSectionWidth={88}
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
        >
          Search
        </Button>
      }
      classNames={{ input: styles.searchTextInput }}
      {...props}
    />
  );
}
