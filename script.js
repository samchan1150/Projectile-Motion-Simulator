// script.js

// Event listener for the launch button
document.getElementById('launchButton').addEventListener('click', simulateProjectile);

function simulateProjectile() {
    // Retrieve user inputs
    const h0 = parseFloat(document.getElementById('initialHeight').value); // Initial height
    const v0 = parseFloat(document.getElementById('initialVelocity').value); // Initial velocity
    const angleDeg = parseFloat(document.getElementById('launchAngle').value); // Launch angle in degrees
    const g = parseFloat(document.getElementById('gravity').value); // Gravity
    const mass = parseFloat(document.getElementById('mass').value); // Mass (unused in basic projectile motion)

    // Convert angle to radians
    const angleRad = angleDeg * (Math.PI / 180);

    // Initial velocity components
    const v0x = v0 * Math.cos(angleRad); // Horizontal component
    const v0y = v0 * Math.sin(angleRad); // Vertical component

    // Time until the projectile lands
    const timeToPeak = v0y / g;
    const hPeak = h0 + v0y * timeToPeak - 0.5 * g * timeToPeak ** 2;
    const totalTime = timeToPeak + Math.sqrt(2 * hPeak / g);

    // Maximum horizontal distance
    const xMax = v0x * totalTime;

    // Set up canvas
    const canvas = document.getElementById('trajectoryCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Scale factors to fit the trajectory within the canvas
    const scaleX = canvas.width / xMax * 0.9; // 0.9 to leave some margin
    const scaleY = canvas.height / (hPeak + h0) * 0.9;

    // Drawing the trajectory
    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;

    for (let t = 0; t <= totalTime; t += 0.01) {
        const x = v0x * t;
        const y = h0 + v0y * t - 0.5 * g * t ** 2;

        // Canvas coordinates
        const canvasX = x * scaleX + 50; // Offset to prevent starting at edge
        const canvasY = canvas.height - y * scaleY - 50; // Offset and invert y-axis

        if (t === 0) {
            ctx.moveTo(canvasX, canvasY);
        } else {
            ctx.lineTo(canvasX, canvasY);
        }
    }

    ctx.stroke();
}