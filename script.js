$(document).ready(function() {
    // Smooth Scrolling and Scroll-Driven Storytelling (unchanged)
    $(window).on('scroll', function() {
        $('.fade-in').each(function() {
            var elementTop = $(this).offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();
            if (windowBottom > elementTop + 50) {
                $(this).addClass('fade-in');
            }
        });
    });

    // Form Validation with jQuery (unchanged)
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

    // Extraordinary Samurai Theme Background Animation (Canvas-based, 60fps+)
    var canvas = document.getElementById('background-canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Sakura Petals Array
    var petals = [];
    var numPetals = 50; // Adjust for performance (fewer = smoother)

    function SakuraPetal(x, y) {
        this.x = x;
        this.y = y;
        this.vx = Math.random() * 0.5 - 0.25; // Horizontal drift (wind)
        this.vy = Math.random() * 1 + 0.5; // Falling speed
        this.rotation = 0;
        this.rotationSpeed = Math.random() * 0.02 - 0.01; // Gentle spin
        this.size = Math.random() * 8 + 4; // Petal size
        this.opacity = Math.random() * 0.8 + 0.2;
        this.shadowOffset = 2; // For depth
    }

    SakuraPetal.prototype.update = function() {
        this.x += this.vx + Math.sin(this.y * 0.01) * 0.5; // Swaying motion
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        if (this.y > canvas.height + 20) {
            this.y = -20; // Reset to top
            this.x = Math.random() * canvas.width;
        }
    };

    SakuraPetal.prototype.draw = function() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Draw petal shape (stylized sakura)
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 182, 193, 0.8)'; // Soft pink
        ctx.fill();
        
        // Add shadow for depth
        ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
        ctx.shadowBlur = this.shadowOffset;
        ctx.shadowOffsetX = this.shadowOffset;
        ctx.shadowOffsetY = this.shadowOffset;
        
        ctx.restore();
    };

    // Initialize petals
    for (var i = 0; i < numPetals; i++) {
        petals.push(new SakuraPetal(Math.random() * canvas.width, Math.random() * canvas.height));
    }

    // Ninja Runner (Simple sprite animation)
    var ninja = {
        x: -100, // Start off-screen
        y: canvas.height - 150, // Ground level
        vx: 2, // Running speed
        frame: 0, // Animation frame
        frames: 8, // Total frames in sprite
        size: 80,
        opacity: 0.6 // Subtle
    };

    function drawNinja() {
        ctx.save();
        ctx.globalAlpha = ninja.opacity;
        
        // Simple running animation (draw as a stick figure with motion blur for "expensive" feel)
        var frameOffset = (ninja.frame % ninja.frames) * 10; // Simulate sprite sheet
        ctx.translate(ninja.x, ninja.y);
        
        // Body (simple shape)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        ctx.fillRect(-10, -40, 20, 40); // Torso
        ctx.fillRect(-15, -50, 30, 10); // Head
        
        // Legs (animated)
        var legSwing = Math.sin(ninja.frame * 0.5) * 10;
        ctx.fillRect(-5, 0, 5, 20 + legSwing); // Left leg
        ctx.fillRect(0, 0, 5, 20 - legSwing); // Right leg
        
        // Arms
        ctx.fillRect(-20, -30, 5, 20);
        ctx.fillRect(15, -30, 5, 20);
        
        ctx.restore();
    }

    function updateNinja() {
        ninja.x += ninja.vx;
        ninja.frame += 0.2; // Slow animation
        if (ninja.x > canvas.width + 100) {
            ninja.x = -100; // Loop back
        }
    }

    // Mouse Interaction for Dynamic Effects
    var mouseX = canvas.width / 2;
    var mouseY = canvas.height / 2;
    $(canvas).on('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Main Animation Loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw falling sakura petals
        petals.forEach(petal => {
            // Add mouse influence (petals sway toward mouse for interactivity)
            var dx = mouseX - petal.x;
            var dy = mouseY - petal.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 200) {
                petal.vx += dx * 0.0001; // Gentle pull
            }
            petal.update();
            petal.draw();
        });
        
        // Draw and update ninja
        drawNinja();
        updateNinja();
        
        requestAnimationFrame(animate);
    }
    animate();

    // Resize Canvas on Window Resize
    $(window).on('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
