document.addEventListener('DOMContentLoaded', function() {

    // Example: Highlight the section the user is currently viewing
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // const container = document.querySelector('.tennis-ball-rain');
    // const numberOfBalls = 50; 

    // function createBall() {
    //     const ball = document.createElement('div');
    //     ball.classList.add('tennis-ball');
    //     const startPos = Math.random() * 100; 
    //     ball.style.left = startPos + 'vw';
    //     ball.style.top = '-50px'; 
    //     container.appendChild(ball);

    //     // Animate the ball
    //     const duration = Math.random() * 2 + 3; 
    //     ball.style.transition = `top ${duration}s linear, opacity 0.5s`;
    //     ball.style.top = '100vh';
    //     ball.style.opacity = 0;

    //     setTimeout(() => {
    //         ball.remove();
    //     }, duration * 1000);
    // }

    // // Create balls at intervals
    // setInterval(createBall, 500); 
});
