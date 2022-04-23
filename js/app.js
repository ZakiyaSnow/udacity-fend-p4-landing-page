/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

const navbar = document.getElementById('navbar__list');
const sections = document.querySelectorAll('[data-nav]');

const buildNav = () => {
  // Build nav menu links based on number of section on the document 
  sections.forEach(section => {
    const nav = document.createElement('li');
    nav.setAttribute('data-view', section.id);
    nav.addEventListener('click', () => {
      document.getElementById(section.id).scrollIntoView({ 
        behavior: 'smooth' 
      });
    });

    const menuLink = document.createElement('a');
    menuLink.classList.add('menu__link');
    menuLink.innerText = section.getAttribute('data-nav');
    
    nav.append(menuLink);
    navbar.appendChild(nav);
  });
};

const onScroll = (e) => {
  sections.forEach(section => {
    // Get section boundaries
    const sectionBounds = section.getBoundingClientRect();
    const inViewport = sectionBounds.top >= 0 && sectionBounds.bottom <= window.innerHeight;
      
    if (inViewport) {
      // Highlight section
      section.classList.add('active');

      // Highlight corresponding nav menu item
      navbar.childNodes.forEach(item => {
        if (inViewport && item.getAttribute('data-view') === section.id) {
          item.classList.add('nav-active');
        } else {
          item.classList.remove('nav-active');
        }
      });
    } else {
      section.classList.remove('active');
    }
  });
};


window.addEventListener('DOMContentLoaded', buildNav);
window.addEventListener('scroll', onScroll);