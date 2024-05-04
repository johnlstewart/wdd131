const themeSelector = document.getElementById('dark-toggle');
const label = document.querySelector('label[for')

// Function to change the theme based on the selected option
function changeTheme() {
    // Check the current value of the select element
    if (themeSelector.value === 'dark') {
        // If the value is 'dark', add the 'dark' class to the body
        document.body.classList.add('dark');
        // Change the logo to the white version
        document.querySelector('footer img').src = 'byui-logo_white.png';
        // Update the label text for dark mode
        label.textContent = "Dark Mode";
    } else {
        // Otherwise, remove the 'dark' class
        document.body.classList.remove('dark');
        // Change the logo back to the blue version
        document.querySelector('footer img').src = 'byui-logo_blue.webp';
        // Update the label text for light mode
        label.textContent = "Light Mode";
    }
}

// Add an event listener to the select element for the 'change' event
themeSelector.addEventListener('change', changeTheme);
