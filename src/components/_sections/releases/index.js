import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Cards from '@components/cards';

const Release = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/" } }
        sort: { fields: frontmatter___date, order: ASC }
        limit: 6
      ) {
        edges {
          node {
            frontmatter {
              id
              title
              date
              external
              description
              image {
                childImageSharp {
                  gatsbyImageData(
                    layout: FULL_WIDTH
                    formats: WEBP
                    placeholder: BLURRED
                  )
                }
              }
            }
          }
        }
      }
    }
  `);
  const releases = data.allMarkdownRemark.edges;

  return (
    <section id='trends'>
      <Cards items={releases} />
    </section>
  );
};

export default Release;
