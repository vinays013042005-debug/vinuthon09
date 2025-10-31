$(document).ready(function() {
    // Smooth Scrolling
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000, 'easeInOutExpo'); // Smooth samurai-like scroll
        }
    });

    // Form Validation
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();

        if (!name || !email || !subject || !message) {
            alert('All fields are required, warrior!');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Enter a valid email, or face the dojo!');
            return;
        }
        alert('Message sent! Your honor is intact.');
        // In a real app, submit to server here
        $(this).trigger('reset');
    });

    // Add Particle Effect (Cherry Blossoms)
    for (var i = 0; i < 50; i++) {
        var particle = $('<div class="particle"></div>');
        particle.css({
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 10 + 's'
        });
        $('body').append(particle);
    }

    // Dynamic Updates (e.g., Profile Glow on Hover)
    $('.profile-pic').hover(function() {
        $(this).css('box-shadow', '0 0 30px #ffd700');
    }, function() {
        $(this).css('box-shadow', '0 0 20px #ff4500');
    });
});
