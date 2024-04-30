/* eslint-disable prefer-destructuring */
import { useMantineTheme } from '@mantine/core';

export default function StarIcon(props: {
  color: 'gray' | 'purple' | 'yellow';
}) {
  const { color } = props;
  const theme = useMantineTheme();
  let resColor: string = '';

  const { gray, purple, yellow } = theme.colors;

  switch (color) {
    case 'gray':
      resColor = gray[3];
      break;
    case 'purple':
      resColor = purple[5];
      break;
    case 'yellow':
      resColor = yellow[7];
      break;
    default:
      break;
  }

  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 20.7083L6.79929 24.4941L8.17479 16.4756L2.34146 10.7974L10.3915 9.63078L13.9918 2.33561L17.5921 9.63078L25.6421 10.7974L19.8088 16.4756L21.1843 24.4941L14 20.7083Z"
        fill={resColor}
        stroke={resColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
