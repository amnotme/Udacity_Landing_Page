/**
 * Define Global Variables
 *
 * 'sections' collects all the section elements from the document for dynamic navigation and interaction.
 * 'navList' is the UL element where the navigation links will be appended.
 */
const sections = document.querySelectorAll('section');
const navList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 *
 * Helper functions below are used to build the navigation dynamically,
 * check for the active section, and update class states accordingly.
 */

/**
 * `createNav` dynamically builds the navigation menu based on the sections present in the document.
 * Each section's data-nav attribute is used to generate the text for the navigation links.
 */
function createNav() {
    for (const section of sections) {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'menu__link';
        link.textContent = section.dataset.nav;  // Gets the name for nav item from the data-nav attribute
        link.href = `#${section.id}`;  // Sets the href to anchor to the section id
        link.addEventListener('click', function (e) {
            e.preventDefault();  // Prevents the default anchor click behavior
            section.scrollIntoView({ behavior: 'smooth' });  // Smoothly scrolls to the section
        });
        listItem.appendChild(link);
        navList.appendChild(listItem);
    }
}

/**
 * `getActiveSection` identifies which section is currently active based on its position in the viewport.
 * It checks each section's bounding rectangle and determines if it's close to the top of the viewport.
 */
function getActiveSection() {
    let minVal = window.innerHeight;
    let activeSection = null;
    for (const section of sections) {
        const box = section.getBoundingClientRect();
        if (box.top > -300 && box.top < minVal) {
            minVal = box.top;
            activeSection = section;
        }
    }
    return activeSection;
}

/**
 * `setActiveClass` adds or removes the 'active-class' from sections as they enter or leave the viewport.
 * It listens for the 'scroll' event to trigger checking and updating the active section.
 */
function setActiveClass() {
    window.addEventListener('scroll', function () {
        let activeSection = getActiveSection();
        if (activeSection) {
            for (const section of sections) {
                section.classList.remove('active-class');
            }
            activeSection.classList.add('active-class');
            const activeNav = document.querySelector(`a[href="#${activeSection.id}"]`);
            document.querySelectorAll('.menu__link').forEach(link => {
                link.classList.remove('active');
            });
            activeNav.classList.add('active');
        }
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 * Main functions are initialized here.
 */

// Build the navigation menu
createNav();

// Set sections as active
setActiveClass();

/**
 * End Main Functions
 * Begin Events
 *
 * Event handling for navigation menu clicks is managed within the createNav function.
 */

// Scroll to section on link click already handled within the createNav function
