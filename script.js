$(document).ready(function() {
    // Smooth Scrolling and Scroll-Driven Storytelling
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > elementTop + 50) {
                $(this).addClass('fade-in');
            }
        });
    });

    // Form Validation with jQuery
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();

        if (!name || !email || !subject || !message) {
            alert('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        alert('Message sent successfully!'); // In a real app, send via AJAX
        $(this)[0].reset();
    });

    // Generative Particle Background Animation (Canvas-based, 60fps+)
    var canvas = document.getElementById('background-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var particles = [];
    var numParticles = 100; // Adjust for performance

    function Particle(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.size = Math.random() * 3 + 1;
    }

    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 123, 255, 0.5)';
        ctx.fill();
    };

    for (var i = 0; i < numParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    function connectParticles() {
        for (var i = 0; i < particles.length; i++) {
            for (var j = i + 1; j < particles.length; j++) {
                var dx = particles[i].x - particles[j].x;
                var dy = particles[i].y - particles[j].y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = 'rgba(0, 123, 255, ' + (1 - distance / 100) + ')';
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    animate();

    // Resize Canvas on Window Resize
    $(window).on('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
