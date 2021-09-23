import React, { useState } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import Button from '@components/button';
import Icon from '@components/icon';
import * as styles from './card.module.scss';

const Card = ({ title, subtitle, image, likeCount = 100 }) => {
  const [active, setActive] = useState({
    love: false,
    share: false,
    bookmark: false,
  });
  const handleOnClick = event => {
    const actionId = event.currentTarget.dataset.id;
    setActive({
      ...active,
      [actionId]: !active[actionId],
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.image}>
        {image && (
          <GatsbyImage
            className={styles.img}
            alt={title}
            image={image.childImageSharp.gatsbyImageData}
          />
        )}
      </div>
      <div className={styles.content}>
        <h6 className={styles.title}>{title}</h6>
        <p className={styles.description}>{subtitle}</p>
      </div>
      <div className={styles.actions}>
        <Button
          onClick={handleOnClick}
          classNames={
            active.love
              ? `${styles.action} ${styles.loveAction} ${styles.active}`
              : styles.action
          }
          data-id='love'
        >
          <Icon name='heart' />
        </Button>
        <Button
          onClick={handleOnClick}
          classNames={
            active.share
              ? `${styles.action} ${styles.shareAction} ${styles.active}`
              : styles.action
          }
          data-id='share'
        >
          <Icon name='share' />
        </Button>
        <Button
          onClick={handleOnClick}
          classNames={
            active.bookmark
              ? `${styles.action} ${styles.bookmarkAction} ${styles.right} ${styles.active}`
              : `${styles.action} ${styles.right}`
          }
          data-id='bookmark'
        >
          <Icon name='bookmark' />
        </Button>
      </div>
    </div>
  );
};

export default Card;
