# Data Model: Physical AI & Humanoid Robotics Textbook

## Overview
This document defines the core data structures and relationships for the Physical AI & Humanoid Robotics textbook content management system.

## Core Entities

### Textbook Chapter
- **name**: String - Title of the chapter
- **number**: Integer - Sequential chapter number in the curriculum
- **part**: String - Major part (Foundations, Simulation, Control, Embodiment, Autonomy)
- **sections**: Array of Section objects - Hierarchical content organization
- **learning_outcomes**: Array of String - Specific skill objectives
- **prerequisites**: Array of String - Required knowledge before starting
- **duration**: Integer - Estimated completion time in weeks
- **technical_focus**: Array of String - Technologies and concepts covered (ROS 2, Gazebo, Isaac, etc.)

### Section
- **title**: String - Section title
- **number**: String - Hierarchical section number (e.g., "3.2")
- **content_type**: String - Type of content (theory, practical, code_example, exercise)
- **subsections**: Array of Section objects - Nested content organization
- **technical_requirements**: Array of String - Tools and technologies needed
- **learning_objectives**: Array of String - Specific learning goals for this section

### Technical Component
- **name**: String - Name of the technology or system (ROS 2, Gazebo, NVIDIA Isaac)
- **category**: String - Type of component (simulation, control, perception, locomotion)
- **description**: String - Technical overview of the component
- **integration_points**: Array of String - How this component connects with others
- **practical_applications**: Array of String - Real-world use cases
- **associated_chapters**: Array of Chapter references - Chapters where this component is used

### Learning Outcome
- **id**: String - Unique identifier for the outcome
- **description**: String - What the student should be able to do after completing
- **associated_chapter**: Chapter reference - Which chapter this outcome belongs to
- **measurement_criteria**: Array of String - How to assess if outcome is met
- **complexity_level**: String - Difficulty level (beginner, intermediate, advanced)

### Assessment Method
- **type**: String - Type of assessment (practical, theoretical, code_review, project)
- **target**: String - What is being assessed (knowledge, skills, application)
- **criteria**: Array of String - Specific evaluation standards
- **associated_chapter**: Chapter reference - Which chapter this assessment belongs to
- **weight**: Float - Contribution to overall course grade (if applicable)

## Relationships

### Chapter-Section Relationship
- One Chapter contains many Sections
- Each Section belongs to exactly one Chapter
- Sections form a hierarchical tree structure within each Chapter

### Chapter-Technical Component Relationship
- One Chapter may use many Technical Components
- One Technical Component may be used in many Chapters
- This is a many-to-many relationship with usage context

### Chapter-Learning Outcome Relationship
- One Chapter has many Learning Outcomes
- Each Learning Outcome belongs to exactly one Chapter
- Outcomes are specific to the chapter content

### Chapter-Assessment Method Relationship
- One Chapter may have many Assessment Methods
- Each Assessment Method targets exactly one Chapter
- Assessments validate the Learning Outcomes of the Chapter

## Validation Rules

### Chapter Validation
- Each chapter must have a unique number within its part
- Each chapter must have at least one learning outcome
- Chapter duration must be between 0.5 and 4 weeks
- Chapter content must align with the progressive flow (Foundations → Simulation → Control → Embodiment → Autonomy)

### Section Validation
- Section numbers must follow hierarchical sequence (e.g., 2.1, 2.2, 2.2.1, 2.2.2)
- Each section must have a clear content type
- Sections must not exceed 5 levels of nesting

### Technical Component Validation
- Component names must be from the approved list (ROS 2, Gazebo, NVIDIA Isaac, sensors, locomotion, perception, humanoid interaction)
- Components must be relevant to humanoid robotics
- Integration points must be technically feasible

### Learning Outcome Validation
- Each outcome must be measurable and specific
- Outcomes must align with the chapter's technical focus
- Complexity level must match the course's progressive structure