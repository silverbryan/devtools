import React from 'react';
import { Layout } from '@components';
import Releases from '@components/_sections/releases';
import Trends from '@components/_sections/trends';

const IndexPage = () => (
  <Layout>
    <Releases />
    <Trends />
  </Layout>
);

export default IndexPage;
