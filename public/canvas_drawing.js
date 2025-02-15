window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Hello Canvas', 50, 50);

    ctx.fillStyle = 'red';
    ctx.fillRect(100, 100, 150, 100);

    ctx.beginPath();
    ctx.arc(400, 150, 50, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(600, 200);
    ctx.lineTo(650, 100);
    ctx.lineTo(700, 200);
    ctx.closePath();
    ctx.fillStyle = 'green';
    ctx.fill();

    const gradient = ctx.createLinearGradient(50, 300, 150, 400);
    gradient.addColorStop(0, 'purple');
    gradient.addColorStop(1, 'pink');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(50, 300);
    ctx.lineTo(150, 300);
    ctx.lineTo(100, 400);
    ctx.closePath();
    ctx.fill();
};