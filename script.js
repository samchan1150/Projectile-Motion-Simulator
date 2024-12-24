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
    const h0 = parseFloat(document.getElementById('initialHeight').value) || 0;
    const v0 = parseFloat(document.getElementById('initialVelocity').value) || 0;
    const angleDeg = parseFloat(document.getElementById('launchAngle').value) || 0;
    const g = parseFloat(document.getElementById('gravity').value) || 9.81;

    // Input validation
    if (v0 < 0 || g <= 0) {
        clearCanvas();
        updateTrajectoryInfo('--', '--', '--');
        return;
    }

    // Convert angle to radians
    const angleRad = angleDeg * (Math.PI / 180);

    // Initial velocity components
    const v0x = v0 * Math.cos(angleRad);
    const v0y = v0 * Math.sin(angleRad);

    let totalTime;

    if (v0y === 0) {
        if (h0 > 0) {
            totalTime = Math.sqrt((2 * h0) / g);
        } else {
            totalTime = 0;
        }
    } else {
        const discriminant = v0y ** 2 + 2 * g * h0;
        if (discriminant < 0) {
            clearCanvas();
            updateTrajectoryInfo('--', '--', '--');
            return;
        }
        totalTime = (v0y + Math.sqrt(discriminant)) / g;
    }

    // Maximum horizontal distance
    const xMax = v0x * totalTime;

    // Maximum vertical distance
    const hMax = h0 + (v0y ** 2) / (2 * g);

    // Update trajectory information display
    updateTrajectoryInfo(hMax.toFixed(2), xMax.toFixed(2), totalTime.toFixed(2));

    // Set up canvas
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Padding around the canvas
    const padding = 60;

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
    const baseY = canvas.height - padding;
    const offsetY = baseY - h0 * scale;

    // Draw axes with scales
    drawAxes(ctx, canvas, padding, offsetX, baseY, scale, xMax, hMax, h0);

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
        const canvasY = baseY - y * scale;

        if (i === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }

    ctx.stroke();
}


// Function to update the trajectory information display
function updateTrajectoryInfo(maxHeight, horizontalDistance, timeOfFlight) {
    document.getElementById('maxHeight').textContent = maxHeight;
    document.getElementById('horizontalDistance').textContent = horizontalDistance;
    document.getElementById('timeOfFlight').textContent = timeOfFlight;
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

// Function to draw axes with scale markers and labels
function drawAxes(ctx, canvas, padding, offsetX, offsetY, scale, xMax, hMax, h0) {
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;

    // Set font for labels
    ctx.font = '12px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);

    // Draw Y-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(padding, padding);

    ctx.stroke();

    // Number of ticks on each axis
    const xTicks = 10;
    const yTicks = 10;

    // X-axis scale markers and labels
    for (let i = 0; i <= xTicks; i++) {
        const xValue = (xMax / xTicks) * i;
        const xCanvas = offsetX + xValue * scale;

        // Draw tick mark
        ctx.beginPath();
        ctx.moveTo(xCanvas, canvas.height - padding - 5);
        ctx.lineTo(xCanvas, canvas.height - padding + 5);
        ctx.stroke();

        // Draw label
        ctx.fillText(xValue.toFixed(1), xCanvas, canvas.height - padding + 15);
    }

    // Y-axis scale markers and labels
    for (let i = 0; i <= yTicks; i++) {
        const yValue = ((hMax + h0) / yTicks) * i;
        const yCanvas = offsetY - yValue * scale;

        // Draw tick mark
        ctx.beginPath();
        ctx.moveTo(padding - 5, yCanvas);
        ctx.lineTo(padding + 5, yCanvas);
        ctx.stroke();

        // Draw label
        ctx.textAlign = 'right';
        ctx.fillText(yValue.toFixed(1), padding - 10, yCanvas);
    }

    // Adjust positions of axis labels to avoid overlap

    // Axis labels
    ctx.save();
    ctx.font = '14px Arial';
    ctx.fillStyle = 'black';

    // X-axis label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    // Position the X-axis label below the tick labels
    ctx.fillText('Distance (m)', canvas.width / 2, canvas.height - padding + 40);

    // Y-axis label (rotated)
    ctx.save();
    ctx.translate(padding - 40, canvas.height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    // Position the Y-axis label to the left of the tick labels
    ctx.fillText('Height (m)', 0, 0);
    ctx.restore();

    ctx.restore();
}

// Function to clear the canvas
function clearCanvas() {
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
