

export function handleMobileNav() {
    const hamburger = document.querySelector('#ham');
    const mobileNav = document.querySelector('.dropdown-menu');

    if (hamburger && mobileNav) {
        if (hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        } else {
            hamburger.classList.add('active');
            mobileNav.classList.add('active');
        }
    } else {
        alert("Something Went Wrong! Try again later!");
    }
}