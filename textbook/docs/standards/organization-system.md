---
sidebar_position: 4
title: Section Numbering and Hierarchical Organization System
---

# Section Numbering and Hierarchical Organization System

## Overview

This document defines the standardized hierarchical organization and numbering system for the Physical AI & Humanoid Robotics textbook.

## Hierarchical Structure

The textbook follows a strict 4-level hierarchical structure:

### Level 1: Part
- **Format**: Named categories (e.g., "Foundations", "Sensors", "ROS", "Simulation", "Locomotion", "Embodiment")
- **Purpose**: Major curriculum divisions representing core areas of humanoid robotics
- **Count**: Exactly 6 parts as defined in the curriculum

### Level 2: Chapter
- **Format**: Numeric prefix + descriptive name (e.g., "01-introduction", "07-ros-fundamentals")
- **Range**: 01-18, sequentially ordered across all parts
- **Purpose**: Comprehensive treatment of specific topics within each part
- **Count**: 3 chapters per part (18 total)

### Level 3: Section
- **Format**: Hierarchical numbering (e.g., "3.2", "4.1.2")
- **Purpose**: Subdivisions of chapters covering specific subtopics
- **Depth**: Maximum 3 levels of nesting (e.g., 4.1.2)

### Level 4: Subsection
- **Format**: Extended hierarchical numbering (e.g., "3.2.1", "4.1.2.3")
- **Purpose**: Detailed breakdown of specific concepts within sections
- **Depth**: Maximum 5 levels of nesting total

## Chapter Numbering System

### Sequential Assignment
Chapters are numbered sequentially across the entire textbook:

1. **01-introduction** - Foundations Part 1
2. **02-physical-ai-concepts** - Foundations Part 2
3. **03-embodied-intelligence** - Foundations Part 3
4. **04-sensor-systems** - Sensors Part 1
5. **05-perception-integration** - Sensors Part 2
6. **06-sensor-fusion** - Sensors Part 3
7. **07-ros-fundamentals** - ROS Part 1
8. **08-nodes-topics-services** - ROS Part 2
9. **09-ros-ecosystem** - ROS Part 3
10. **10-gazebo-basics** - Simulation Part 1
11. **11-urdf-modeling** - Simulation Part 2
12. **12-digital-twins** - Simulation Part 3
13. **13-locomotion-systems** - Locomotion Part 1
14. **14-movement-control** - Locomotion Part 2
15. **15-kinematics-dynamics** - Locomotion Part 3
16. **16-autonomous-control** - Embodiment Part 1
17. **17-humanoid-interaction** - Embodiment Part 2
18. **18-advanced-integration** - Embodiment Part 3

### Directory Structure
```
textbook/
├── docs/
│   ├── foundations/     # Part 1: Foundations (Chapters 01-03)
│   │   ├── 01-introduction/
│   │   ├── 02-physical-ai-concepts/
│   │   └── 03-embodied-intelligence/
│   ├── sensors/         # Part 2: Sensors (Chapters 04-06)
│   │   ├── 04-sensor-systems/
│   │   ├── 05-perception-integration/
│   │   └── 06-sensor-fusion/
│   ├── ros/             # Part 3: ROS (Chapters 07-09)
│   │   ├── 07-ros-fundamentals/
│   │   ├── 08-nodes-topics-services/
│   │   └── 09-ros-ecosystem/
│   ├── simulation/      # Part 4: Simulation (Chapters 10-12)
│   │   ├── 10-gazebo-basics/
│   │   ├── 11-urdf-modeling/
│   │   └── 12-digital-twins/
│   ├── locomotion/      # Part 5: Locomotion (Chapters 13-15)
│   │   ├── 13-locomotion-systems/
│   │   ├── 14-movement-control/
│   │   └── 15-kinematics-dynamics/
│   └── embodiment/      # Part 6: Embodiment (Chapters 16-18)
│       ├── 16-autonomous-control/
│       ├── 17-humanoid-interaction/
│       └── 18-advanced-integration/
```

## Section Numbering Convention

### Primary Sections
- **Format**: `# Section Title` (Markdown H1)
- **Numbering**: Implied by chapter position (no explicit numbering in text)
- **Purpose**: Major divisions within chapters

### Secondary Sections
- **Format**: `## Section Title` (Markdown H2)
- **Numbering**: Chapter.section (e.g., "3.2" for second section of chapter 3)
- **Purpose**: Subdivisions of primary sections

### Tertiary Sections
- **Format**: `### Section Title` (Markdown H3)
- **Numbering**: Chapter.section.subsection (e.g., "3.2.1" for first subsection of section 3.2)
- **Purpose**: Detailed breakdown of secondary sections

### Quaternary Sections
- **Format**: `#### Section Title` (Markdown H4)
- **Numbering**: Chapter.section.subsection.subsubsection (e.g., "3.2.1.1")
- **Purpose**: Very detailed subdivisions (used sparingly)

## Cross-Reference System

### Internal References
Cross-references within the textbook follow this format:
- **Chapter reference**: "See Chapter 7: ROS Fundamentals"
- **Section reference**: "See Section 3.2 for details"
- **Figure reference**: "Figure 3.2 shows..."
- **Equation reference**: "Using Equation 3.1..."

### Link Format
- **Cross-part navigation**: Use full chapter names for clarity
- **Cross-chapter references**: Include chapter numbers for precision
- **Cross-section references**: Use hierarchical numbering for specificity

## Navigation Structure

### Sidebar Organization
The Docusaurus sidebar follows the hierarchical structure:
1. Part level (major category)
2. Chapter level (numbered and named)
3. Section level (if appropriate for navigation)

### Breadcrumb Trail
Each page displays a breadcrumb showing the hierarchical path:
`Part > Chapter > Section > Subsection`

## Consistency Requirements

### Numbering Consistency
- All sections must follow the hierarchical numbering scheme
- Numbers must be sequential within each level
- No gaps or skipped numbers in sequences

### Naming Consistency
- Chapter directory names match the numbering system
- File names use kebab-case (e.g., "01-introduction")
- Section titles are descriptive and consistent in style

### Structural Consistency
- All chapters follow the same basic structure template
- Sections are used consistently across chapters
- Hierarchical depth is appropriate for content complexity

## Validation Rules

### Section Depth Limits
- Maximum 5 levels of nesting total
- Most chapters should not exceed 3 levels
- Deep nesting should be used only when necessary for organization

### Content Balance
- Sections should contain substantial content (not single paragraphs)
- Similar concepts should be grouped at the same hierarchical level
- Logical flow should be maintained across section boundaries

## Maintenance Guidelines

### Adding New Content
- New sections must follow existing numbering patterns
- New chapters must be inserted with appropriate numbers
- Cross-references must be updated when renumbering occurs

### Updating Existing Content
- Section numbers must be updated if hierarchy changes
- Cross-references must be verified after structural changes
- Navigation elements must reflect any structural updates

This organization system ensures consistent, predictable, and intuitive navigation throughout the textbook while maintaining the academic rigor appropriate for graduate-level content.