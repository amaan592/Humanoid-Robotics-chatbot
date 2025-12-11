import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'a87'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'a07'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '701'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'd4b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'a0b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '89e'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '175'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '588'),
    routes: [
      {
        path: '/docs',
        component: ComponentCreator('/docs', '101'),
        routes: [
          {
            path: '/docs',
            component: ComponentCreator('/docs', '1c7'),
            routes: [
              {
                path: '/docs/embodiment',
                component: ComponentCreator('/docs/embodiment', 'b52'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/embodiment/advanced-integration/advanced-integration',
                component: ComponentCreator('/docs/embodiment/advanced-integration/advanced-integration', '182'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/embodiment/autonomous-control/autonomous-control',
                component: ComponentCreator('/docs/embodiment/autonomous-control/autonomous-control', 'eac'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/embodiment/humanoid-interaction/humanoid-interaction',
                component: ComponentCreator('/docs/embodiment/humanoid-interaction/humanoid-interaction', '933'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/foundations',
                component: ComponentCreator('/docs/foundations', '05c'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/foundations/editorial-review',
                component: ComponentCreator('/docs/foundations/editorial-review', '470'),
                exact: true
              },
              {
                path: '/docs/foundations/embodied-intelligence/embodied-intelligence',
                component: ComponentCreator('/docs/foundations/embodied-intelligence/embodied-intelligence', 'e84'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/foundations/final-approval',
                component: ComponentCreator('/docs/foundations/final-approval', '8fa'),
                exact: true
              },
              {
                path: '/docs/foundations/introduction/intro',
                component: ComponentCreator('/docs/foundations/introduction/intro', 'db1'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/foundations/physical-ai-concepts/physical-ai',
                component: ComponentCreator('/docs/foundations/physical-ai-concepts/physical-ai', '4ff'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/foundations/project-completion-summary',
                component: ComponentCreator('/docs/foundations/project-completion-summary', '806'),
                exact: true
              },
              {
                path: '/docs/foundations/validation-report',
                component: ComponentCreator('/docs/foundations/validation-report', '957'),
                exact: true
              },
              {
                path: '/docs/locomotion',
                component: ComponentCreator('/docs/locomotion', '39c'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/locomotion/kinematics-dynamics/kinematics-dynamics',
                component: ComponentCreator('/docs/locomotion/kinematics-dynamics/kinematics-dynamics', '580'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/locomotion/locomotion-systems/locomotion-systems',
                component: ComponentCreator('/docs/locomotion/locomotion-systems/locomotion-systems', 'edd'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/locomotion/movement-control/movement-control',
                component: ComponentCreator('/docs/locomotion/movement-control/movement-control', 'e88'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/ros',
                component: ComponentCreator('/docs/ros', '72c'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/ros/nodes-topics-services/nodes-topics-services',
                component: ComponentCreator('/docs/ros/nodes-topics-services/nodes-topics-services', '6db'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/ros/ros-ecosystem/ros-ecosystem',
                component: ComponentCreator('/docs/ros/ros-ecosystem/ros-ecosystem', '6ad'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/ros/ros-fundamentals/ros-fundamentals',
                component: ComponentCreator('/docs/ros/ros-fundamentals/ros-fundamentals', '990'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/sensors',
                component: ComponentCreator('/docs/sensors', 'f83'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/sensors/perception-integration/perception-integration',
                component: ComponentCreator('/docs/sensors/perception-integration/perception-integration', '335'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/sensors/sensor-fusion/sensor-fusion',
                component: ComponentCreator('/docs/sensors/sensor-fusion/sensor-fusion', '861'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/sensors/sensor-systems/sensor-systems',
                component: ComponentCreator('/docs/sensors/sensor-systems/sensor-systems', '9f0'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/simulation',
                component: ComponentCreator('/docs/simulation', '0cf'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/simulation/digital-twin-validation',
                component: ComponentCreator('/docs/simulation/digital-twin-validation', 'a45'),
                exact: true
              },
              {
                path: '/docs/simulation/digital-twins/digital-twins',
                component: ComponentCreator('/docs/simulation/digital-twins/digital-twins', '9d2'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/simulation/editorial-review',
                component: ComponentCreator('/docs/simulation/editorial-review', '708'),
                exact: true
              },
              {
                path: '/docs/simulation/final-approval',
                component: ComponentCreator('/docs/simulation/final-approval', 'ad4'),
                exact: true
              },
              {
                path: '/docs/simulation/gazebo-basics/gazebo-basics',
                component: ComponentCreator('/docs/simulation/gazebo-basics/gazebo-basics', 'd98'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/simulation/gazebo-physics-validation',
                component: ComponentCreator('/docs/simulation/gazebo-physics-validation', '83f'),
                exact: true
              },
              {
                path: '/docs/simulation/isaac-perception',
                component: ComponentCreator('/docs/simulation/isaac-perception', '289'),
                exact: true
              },
              {
                path: '/docs/simulation/simulation-accuracy-validation',
                component: ComponentCreator('/docs/simulation/simulation-accuracy-validation', 'f5f'),
                exact: true
              },
              {
                path: '/docs/simulation/textbook-validation-report',
                component: ComponentCreator('/docs/simulation/textbook-validation-report', 'cfd'),
                exact: true
              },
              {
                path: '/docs/simulation/urdf-modeling/urdf-modeling',
                component: ComponentCreator('/docs/simulation/urdf-modeling/urdf-modeling', 'e1d'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards',
                component: ComponentCreator('/docs/standards', '868'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/academic-tone',
                component: ComponentCreator('/docs/standards/academic-tone', 'c59'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/assessment-templates',
                component: ComponentCreator('/docs/standards/assessment-templates', '611'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/chapter-template',
                component: ComponentCreator('/docs/standards/chapter-template', 'b42'),
                exact: true
              },
              {
                path: '/docs/standards/cross-reference-system',
                component: ComponentCreator('/docs/standards/cross-reference-system', 'cfa'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/glossary',
                component: ComponentCreator('/docs/standards/glossary', 'dcb'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/learning-outcomes',
                component: ComponentCreator('/docs/standards/learning-outcomes', '26c'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/organization-system',
                component: ComponentCreator('/docs/standards/organization-system', '57c'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/review-workflow',
                component: ComponentCreator('/docs/standards/review-workflow', 'f0b'),
                exact: true,
                sidebar: "textbookSidebar"
              },
              {
                path: '/docs/standards/validation-framework',
                component: ComponentCreator('/docs/standards/validation-framework', '04e'),
                exact: true,
                sidebar: "textbookSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '11f'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
