import Image from 'next/image';
import NoPosterIcon from '../../../public/images/svg/no-poster-icon.svg';
import styles from './noPoster.module.scss';

export default function NoPoster() {
  return (
    <section className={styles.noPoster}>
      <Image src={NoPosterIcon} alt="no poster" />
      <span className={styles.noPoster__text}>No Poster</span>
    </section>
  );
}
