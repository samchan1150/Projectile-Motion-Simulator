# Projectile Motion Simulator

Welcome to the Projectile Motion Simulator!

This interactive simulation allows you to explore the fascinating physics of projectile motion by adjusting various parameters and observing the resulting trajectory of a projectile launched from a cannon. It's a valuable tool for students, educators, or anyone interested in understanding how objects move under the influence of gravity.

## How the Simulation Works

The simulator models the motion of a projectile launched at an angle from a certain height. It calculates the projectile's trajectory using the principles of kinematics, considering factors like initial velocity, launch angle, and gravity. Here's what you can do with it:

### Adjustable Parameters

- **Initial Height (m)**:
  - **Description**: The vertical position from which the projectile is launched relative to the ground.
  - **Usage**: Enter a value to simulate launching from different elevations, such as a cliff or platform.

- **Initial Velocity (m/s)**:
  - **Description**: The speed at which the projectile is fired from the cannon.
  - **Usage**: Higher values result in longer ranges and higher peaks.

- **Launch Angle (°)**:
  - **Description**: The angle above the horizontal at which the projectile is launched.
  - **Usage**: Adjust between 0° (horizontal launch) and 90° (vertical launch) to see how angle affects the trajectory.

- **Gravity (m/s²)**:
  - **Description**: The acceleration due to gravity acting on the projectile.
  - **Usage**: The default value is 9.81 m/s² (Earth's gravity). Change it to simulate conditions on other planets or moons.

- **Mass (kg)**:
  - **Description**: The mass of the projectile.
  - **Usage**: Currently, mass does not influence the trajectory in this simulation, as air resistance is neglected.

## Using the Simulator

### 1. Input Controls

- **Locate the Input Fields**: On the left side of the simulator, you'll find input fields for each parameter.
- **Adjust Values**:
  - Click on an input field and enter the desired value.
  - For example, set the Initial Velocity to 60 m/s or the Launch Angle to 30 degrees.
- **Real-Time Updates**:
  - The simulator updates automatically as you change the inputs.
  - Invalid inputs are highlighted, and the simulation adjusts accordingly.

### 2. Trajectory Visualization

- **Trajectory Path**:
  - The projectile's path is displayed on a coordinate plane.
  - A red curve represents the trajectory, showing how the projectile moves through the air.
- **Axes and Scales**:
  - The horizontal axis represents distance (meters), and the vertical axis represents height (meters).
  - Scale markers and labels help you quantify the projectile's position at any point.

### 3. Animation Controls

- **Play Button**:
  - Click Play to start the animation.
  - A cannonball appears and moves along the trajectory, illustrating the projectile's motion over time.
- **Stop Button**:
  - Click Stop to pause the animation at any point.
  - You can resume by clicking Play again.
- **Real-Time Interaction**:
  - While the animation is running or stopped, you can adjust the input parameters.
  - The simulation resets with the new parameters, allowing continuous experimentation.

### 4. Trajectory Information Display

- **Key Metrics**:
  - Maximum Height: The highest vertical position reached by the projectile.
  - Horizontal Distance: The total horizontal distance traveled before landing.
  - Time of Flight: The total time the projectile remains in the air.
- **Location**:
  - On the left side, beneath the input controls, these values update in real-time as you adjust parameters.

## Understanding the Physics

### Projectile Motion Principles

- **Components of Motion**:
  - The motion is split into horizontal and vertical components.
  - Horizontal Motion: Constant velocity (assuming no air resistance).
  - Vertical Motion: Influenced by gravity, resulting in acceleration downward.

### Effect of Parameters

- **Initial Velocity**: Affects both horizontal range and maximum height.
- **Launch Angle**: Alters the shape of the trajectory. A 45° angle typically yields the maximum range on level ground.
- **Gravity**: Higher gravity pulls the projectile down faster, reducing range and height.

## Tips for Using the Simulator

### Experiment Freely

- Try different combinations of parameters to see how they affect the trajectory.
- Observe how small changes in the launch angle significantly alter the path.

### Educational Exploration

- Use the simulator to reinforce concepts learned in physics classes.
- Visualize problems from textbooks by inputting the given values.

### Simulating Different Environments

- Change the gravity to simulate conditions on the Moon (1.62 m/s²) or Mars (3.71 m/s²).
- Understand how gravity influences projectile motion in different settings.

## Important Notes

### Input Validation

- The simulator enforces valid input ranges.
  - Gravity must be a positive value greater than zero.
  - Negative velocities or angles outside the 0°–90° range are not accepted.

### Assumptions

- Air resistance and wind effects are neglected.
- The mass of the projectile does not affect the trajectory under these simplified conditions.

### Accuracy

- Calculations are based on ideal projectile motion equations.
- While the simulation provides a close approximation, real-world factors may cause deviations.
