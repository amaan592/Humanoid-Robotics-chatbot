import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/foundations/introduction/intro">
            Read Textbook
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Welcome to ${siteConfig.title}`}
      description="Physical AI & Humanoid Robotics Textbook - A Graduate-Level Textbook on Embodied Intelligence and Humanoid Control Systems">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              <div className="col col--12 text--center">
                <h2>About This Textbook</h2>
                <p>
                  This graduate-level textbook covers the fundamentals and advanced concepts of Physical AI and humanoid robotics,
                  with emphasis on simulation-to-reality transfer, ROS 2 integration, Gazebo simulation, and NVIDIA Isaac platforms.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col col--4 text--center">
                <h3>Physical AI</h3>
                <p>Learn about embodied intelligence and the principles of Physical AI for humanoid robots.</p>
              </div>
              <div className="col col--4 text--center">
                <h3>Simulation-to-Reality</h3>
                <p>Master the techniques for bridging the gap between simulation and real-world robotics.</p>
              </div>
              <div className="col col--4 text--center">
                <h3>Technical Stack</h3>
                <p>Gain expertise in ROS 2, Gazebo, and NVIDIA Isaac for professional robotics development.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}