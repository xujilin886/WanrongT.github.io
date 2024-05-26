// scripts/script.js
document.addEventListener("DOMContentLoaded", function () {

    // add classes for mobile navigation toggling
    var CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#cs-navigation");
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    CShamburgerMenu.addEventListener('click', function () {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

    // This script adds a class to the body after scrolling 100px
    // and we used these body.scroll styles to create some on scroll 
    // animations with the navbar

    document.addEventListener('scroll', (e) => {
        const scroll = document.documentElement.scrollTop;
        if (scroll >= 100) {
            document.querySelector('body').classList.add('scroll')
        } else {
            document.querySelector('body').classList.remove('scroll')
        }
    });


    // mobile nav toggle code
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
            item.classList.toggle('cs-active')
        }
        item.addEventListener('click', onClick)
    }


});

const header = document.querySelector('header');
const img = document.querySelector('.img');
let scrollDistance = 0;
let requestId = null;

function updateHeaderClipPath() {
    const clipPathValue = `polygon(0 0, 100% 0%, 100% ${(scrollDistance <= 600) ? 100 - ((scrollDistance / 600) * 60) : 75}%, 0 100%)`;
    header.style.clipPath = clipPathValue;
    const scaleValue = 1 + ((scrollDistance / 600) * 1);
    img.style.transform = `scale(${scaleValue})`;
    const opacityValue = (scrollDistance / 600);
}
function scrollHandler(event) {
    if (event.deltaY < 0) {
        scrollDistance = Math.max(0, scrollDistance + event.deltaY);
    } else {
        scrollDistance = Math.min(600, scrollDistance + event.deltaY);
    }
    if (!requestId) {
        requestId = window.requestAnimationFrame(() => {
            updateHeaderClipPath();
            requestId = null;
        });
    }
}
window.addEventListener('wheel', scrollHandler);

const faqItems = Array.from(document.querySelectorAll('.cs-faq-item'));
for (const item of faqItems) {
    const onClick = () => {
        item.classList.toggle('active')
    }
    item.addEventListener('click', onClick)
}

