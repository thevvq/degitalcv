document.addEventListener("DOMContentLoaded", function () {
    let circles = document.querySelectorAll('.circle');

    function runAnimation(progress) {
        let degree = 0;
        let targetDegree = parseInt(progress.getAttribute('data-degree'));
        let color = progress.getAttribute('data-color') || "#00bfff";
        let numberSpan = progress.querySelector('.number');

        let interval = setInterval(function () {
            if (degree >= targetDegree) {
                clearInterval(interval);
                return;
            }
            degree += 1;
            progress.style.background = `conic-gradient(
                ${color} ${degree * 3.6}deg, #fff ${degree * 3.6}deg
            )`;
            numberSpan.innerHTML = `${degree}<span>%</span>`;
        }, 20);
    }

    // Dùng IntersectionObserver để chỉ chạy khi scroll tới
    let observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runAnimation(entry.target);
                observer.unobserve(entry.target); // chỉ chạy 1 lần
            }
        });
    }, {
        threshold: 0.3
    });

    circles.forEach(circle => {
        observer.observe(circle);
    });
});

// home
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}