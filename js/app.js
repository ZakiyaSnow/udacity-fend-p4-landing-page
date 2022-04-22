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

    const menuLink = document.createElement('a');
    menuLink.classList.add('menu__link');
    menuLink.href = `#${section.id}`;
    menuLink.innerText = section.getAttribute('data-nav');
    
    nav.append(menuLink);
    navbar.appendChild(nav);
  });
};

const onScroll = (e) => {
  sections.forEach(section => {
    // Get section boundaries
    const sectionBounds = section.getBoundingClientRect();
    // Section is considered within viewport if top of section is at least
    // one-third into the viewport 
    const inViewport = sectionBounds.top <= Math.floor(window.innerHeight / 3);
      
    if (inViewport) {
      // Highlight section
      section.classList.add('your-active-class');

      // Highlight corresponding nav menu item
      navbar.childNodes.forEach(item => {
        if (inViewport && item.getAttribute('data-view') === section.id) {
          item.style.background = 'lightgreen';
        } else {
          item.style.background = 'white';
        }
      });
    } else {
      section.classList.remove('your-active-class');
    }
  });
};


window.addEventListener('DOMContentLoaded', buildNav);
window.addEventListener('scroll', onScroll);