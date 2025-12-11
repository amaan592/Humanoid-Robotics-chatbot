import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI Focus',
    description: (
      <>
        Deep exploration of Physical AI principles and embodied intelligence for humanoid robotics.
      </>
    ),
  },
  {
    title: 'Simulation-to-Reality',
    description: (
      <>
        Comprehensive coverage of techniques for bridging simulation and real-world robotics applications.
      </>
    ),
  },
  {
    title: 'Technical Mastery',
    description: (
      <>
        Professional tools and frameworks: ROS 2, Gazebo, and NVIDIA Isaac integration.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}