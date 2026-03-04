function initLoco() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

function srvAnimations() {
    if(document.querySelector(".hero-title h1")) {
        gsap.from(".hero-title h1", {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "power4.out"
        });
    }

    if(document.querySelector(".srv-row")) {
        gsap.utils.toArray(".srv-row").forEach(row => {
            gsap.from(row.querySelectorAll(".srv-col-text > *"), {
                scrollTrigger: {
                    trigger: row,
                    scroller: "#main",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            });
        });
    }
}

function mobileMenu() {
    const menuToggle = document.querySelector("#menu-toggle");
    const closeToggle = document.querySelector("#close-toggle");
    const mobileMenu = document.querySelector("#mobile-menu");

    if(menuToggle && closeToggle && mobileMenu) {
        menuToggle.addEventListener("click", function() {
            mobileMenu.style.right = "0%";
        });

        closeToggle.addEventListener("click", function() {
            mobileMenu.style.right = "-100%";
        });

        document.querySelectorAll("#mobile-links a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.style.right = "-100%";
            });
        });
    }
}

initLoco();
srvAnimations();
mobileMenu();