// Function to initialize event listeners and draw initial trajectory
function initializeSimulator() {
    // Get all input elements
    const inputs = document.querySelectorAll('#controls input');

    // Add event listeners to all input elements
    inputs.forEach(input => {
        input.addEventListener('input', simulateProjectile);
    });

    // Draw the initial trajectory
    simulateProjectile();
}

// Call initialize function on window load
window.onload = initializeSimulator;

function simulateProjectile() {
    // Retrieve user inputs
    const h0 = parseFloat(document.getElementById('initialHeight').value) || 0; // Initial height
    const v0 = parseFloat(document.getElementById('initialVelocity').value) || 0; // Initial velocity
    const angleDeg = parseFloat(document.getElementById('launchAngle').value) || 0; // Launch angle in degrees
    const g = parseFloat(document.getElementById('gravity').value) || 9.81; // Gravity

    // Input validation
    if (v0 < 0 || g <= 0) {
        // Clear canvas if inputs are invalid
        clearCanvas();
        return;
    }

    // Convert angle to radians
    const angleRad = angleDeg * (Math.PI / 180);

    // Initial velocity components
    const v0x = v0 * Math.cos(angleRad); // Horizontal component
    const v0y = v0 * Math.sin(angleRad); // Vertical component

    let totalTime;

    if (v0y === 0) {
        // Handle zero vertical velocity (angle = 0 degrees)
        if (h0 > 0) {
            // Only vertical motion due to initial height
            totalTime = Math.sqrt((2 * h0) / g);
        } else {
            // No vertical motion; projectile is already on the ground
            totalTime = 0;
        }
    } else {
        // Time until the projectile lands
        // Solve quadratic equation y(t) = 0 to find total flight time
        const discriminant = v0y ** 2 + 2 * g * h0;
        if (discriminant < 0) {
            // Clear canvas if discriminant is negative (no real roots)
            clearCanvas();
            return;
        }
        totalTime = (v0y + Math.sqrt(discriminant)) / g;
    }

    // Maximum horizontal distance
    const xMax = v0x * totalTime;

    // Maximum vertical distance
    const hMax = h0 + (v0y ** 2) / (2 * g);

    // Set up canvas
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Padding around the canvas
    const padding = 50;

    // Determine the scaling factor to be the same for both axes
    let scaleRatioX = (canvas.width - 2 * padding) / xMax;
    let scaleRatioY = (canvas.height - 2 * padding) / (hMax + h0);

    // Handle cases where xMax or hMax is zero
    if (!isFinite(scaleRatioX) || scaleRatioX <= 0) {
        scaleRatioX = 1;
    }
    if (!isFinite(scaleRatioY) || scaleRatioY <= 0) {
        scaleRatioY = 1;
    }

    // Use the smaller scaling factor to ensure the entire trajectory fits in the canvas
    const scale = Math.min(scaleRatioX, scaleRatioY);

    // Adjust offsets to position the trajectory correctly
    const offsetX = padding;
    const offsetY = canvas.height - padding - h0 * scale;

    // Draw axes (optional)
    drawAxes(ctx, canvas, padding);

    // Draw the cannon at the starting point
    drawCannon(ctx, offsetX, offsetY, angleRad);

    // If totalTime is zero, there's nothing to draw
    if (totalTime === 0) {
        return;
    }

    // Drawing the trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    const steps = 1000;
    for (let i = 0; i <= steps; i++) {
        const t = (i / steps) * totalTime;
        const x = v0x * t;
        const y = h0 + v0y * t - 0.5 * g * t ** 2;

        // Canvas coordinates
        const canvasX = offsetX + x * scale;
        const canvasY = offsetY - y * scale; // Invert y-axis and adjust for offset

        if (i === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }

    ctx.stroke();
}

// Function to draw the cannon
function drawCannon(ctx, x, y, angle) {
    ctx.save(); // Save the current context state
    ctx.translate(x, y); // Move to the cannon's position
    ctx.rotate(-angle); // Rotate to match the launch angle (negative due to canvas coordinates)

    // Draw the cannon barrel
    ctx.fillStyle = 'black';
    ctx.fillRect(0, -5, 40, 10); // Rectangle representing the cannon barrel

    // Draw the cannon base
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore(); // Restore the original context state
}

// Function to draw axes (optional)
function drawAxes(ctx, canvas, padding) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);

    // Y-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);

    ctx.stroke();
}

// Function to clear the canvas
function clearCanvas() {
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
