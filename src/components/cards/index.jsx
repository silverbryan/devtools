import React from 'react';
import Card from '@components/card';
import * as styles from './cards.module.scss';

const Cards = ({ items }) => (
  <div className={styles.grid}>
    {items &&
      items.map(({ node }) => {
        const { id, title, description, image } = node.frontmatter;
        return (
          <Card key={id} title={title} subtitle={description} image={image} />
        );
      })}
  </div>
);

export default Cards;
