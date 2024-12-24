// Event listener for the launch button
document.getElementById('launchButton').addEventListener('click', simulateProjectile);

function simulateProjectile() {
    // Retrieve user inputs
    const h0 = parseFloat(document.getElementById('initialHeight').value); // Initial height
    const v0 = parseFloat(document.getElementById('initialVelocity').value); // Initial velocity
    const angleDeg = parseFloat(document.getElementById('launchAngle').value); // Launch angle in degrees
    const g = parseFloat(document.getElementById('gravity').value); // Gravity

    // Convert angle to radians
    const angleRad = angleDeg * (Math.PI / 180);

    // Initial velocity components
    const v0x = v0 * Math.cos(angleRad); // Horizontal component
    const v0y = v0 * Math.sin(angleRad); // Vertical component

    // Time until the projectile lands
    // Solve quadratic equation y(t) = 0 to find total flight time
    const discriminant = v0y ** 2 + 2 * g * h0;
    const totalTime = (v0y + Math.sqrt(discriminant)) / g;

    // Maximum horizontal distance
    const xMax = v0x * totalTime;

    // Maximum vertical distance
    const hMax = h0 + (v0y ** 2) / (2 * g);

    // Set up canvas
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Padding around the canvas
    const padding = 20;

    // Determine the scaling factor to be the same for both axes
    const scaleRatioX = (canvas.width - 2 * padding) / xMax;
    const scaleRatioY = (canvas.height - 2 * padding) / (hMax + h0);

    // Use the smaller scaling factor to ensure the entire trajectory fits in the canvas
    const scale = Math.min(scaleRatioX, scaleRatioY);

    // Adjust offsets to position the trajectory correctly
    const offsetX = padding;
    const offsetY = canvas.height - padding - h0 * scale;

    // Draw axes (optional)
    drawAxes(ctx, canvas, padding);

    // Draw the cannon at the starting point
    drawCannon(ctx, offsetX, offsetY, angleRad);

    // Drawing the trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    for (let t = 0; t <= totalTime; t += totalTime / 1000) {
        const x = v0x * t;
        const y = h0 + v0y * t - 0.5 * g * t ** 2;

        // Canvas coordinates
        const canvasX = offsetX + x * scale;
        const canvasY = offsetY - y * scale; // Invert y-axis and adjust for offset

        if (t === 0) {
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
    ctx.rotate(-angle); // Rotate to match the launch angle (negative to adjust for canvas coordinate system)

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