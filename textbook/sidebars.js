// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  textbookSidebar: [
    {
      type: 'category',
      label: 'Standards',
      items: [
        'standards/academic-tone',
        'standards/glossary',
        'standards/learning-outcomes',
        'standards/assessment-templates',
        'standards/organization-system',
        'standards/cross-reference-system',
        'standards/review-workflow',
        'standards/validation-framework'
      ],
      link: {
        type: 'generated-index',
        title: 'Standards',
        description: 'Academic and technical standards for the textbook',
        slug: '/standards',
      },
    },
    {
      type: 'category',
      label: 'Templates',
      items: [
      ],
      link: {
        type: 'generated-index',
        title: 'Templates',
        description: 'Content templates for consistent structure',
        slug: '/templates',
      },
    },
    {
      type: 'category',
      label: 'Foundations',
      items: [
        'foundations/introduction/intro',
        'foundations/physical-ai-concepts/physical-ai',
        'foundations/embodied-intelligence/embodied-intelligence'
      ],
      link: {
        type: 'generated-index',
        title: 'Foundations',
        description: 'Core concepts of Physical AI and embodied intelligence',
        slug: '/foundations',
      },
    },
    {
      type: 'category',
      label: 'Sensors',
      items: [
        'sensors/sensor-systems/sensor-systems',
        'sensors/perception-integration/perception-integration',
        'sensors/sensor-fusion/sensor-fusion'
      ],
      link: {
        type: 'generated-index',
        title: 'Sensors',
        description: 'Sensor systems and perception for humanoid robots',
        slug: '/sensors',
      },
    },
    {
      type: 'category',
      label: 'ROS',
      items: [
        'ros/ros-fundamentals/ros-fundamentals',
        'ros/nodes-topics-services/nodes-topics-services',
        'ros/ros-ecosystem/ros-ecosystem'
      ],
      link: {
        type: 'generated-index',
        title: 'ROS',
        description: 'Robot Operating System fundamentals and ecosystem',
        slug: '/ros',
      },
    },
    {
      type: 'category',
      label: 'Simulation',
      items: [
        'simulation/gazebo-basics/gazebo-basics',
        'simulation/urdf-modeling/urdf-modeling',
        'simulation/digital-twins/digital-twins'
      ],
      link: {
        type: 'generated-index',
        title: 'Simulation',
        description: 'Gazebo simulation and digital twin concepts',
        slug: '/simulation',
      },
    },
    {
      type: 'category',
      label: 'Locomotion',
      items: [
        'locomotion/locomotion-systems/locomotion-systems',
        'locomotion/movement-control/movement-control',
        'locomotion/kinematics-dynamics/kinematics-dynamics'
      ],
      link: {
        type: 'generated-index',
        title: 'Locomotion',
        description: 'Movement control and kinematics for humanoid robots',
        slug: '/locomotion',
      },
    },
    {
      type: 'category',
      label: 'Embodiment',
      items: [
        'embodiment/autonomous-control/autonomous-control',
        'embodiment/humanoid-interaction/humanoid-interaction',
        'embodiment/advanced-integration/advanced-integration'
      ],
      link: {
        type: 'generated-index',
        title: 'Embodiment',
        description: 'Autonomous control and advanced integration',
        slug: '/embodiment',
      },
    },
  ],
};

module.exports = sidebars;