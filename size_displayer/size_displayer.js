////////////////////////////////////////////////////////////////////
// Check wether the size displayer not is disabled
////////////////////////////////////////////////////////////////////
let size_display = document.querySelector('#size_display');
if (!size_display ||
    ("disabled" in size_display.dataset &&
        size_display.dataset.disabled == 'true'))
    throw new Error('size displayer is disabled or does not exist');

////////////////////////////////////////////////////////////////////
// Load size_displayer.css, in a <link> at the end of <head>
////////////////////////////////////////////////////////////////////
size_display_css = document.createElement('link');
size_display_css.setAttribute('rel', 'stylesheet');
size_display_css.setAttribute('href', 'size_displayer/size_displayer.css');
document.head.append(size_display_css);

////////////////////////////////////////////////////////////////////
// Create the options block and add it to the document
////////////////////////////////////////////////////////////////////
let options_modal = document.createElement('div');
document.body.append(options_modal);
options_modal.innerHTML = `
<div id="options-modal">
</div>
<div id="options">
    <div class="title-bar">
        <div class="title"><b>Réglages</b></div>
        <button id="hide-options">X</button>
    </div>
    <div id="radio">
        <label for="small"><input type="radio" name="size" id="small"> Petit</label>
        <label for="normal"><input type="radio" name="size" id="normal" checked> Moyen</label>
        <label for="big"><input type="radio" name="size" id="big"> Grand</label>
    </div>
    <div class="slider-box mt">
        <label for="transparency">Transparence</label>
        <input type="range" id="transparency" min=0 max=100 value=50>
    </div>
    <div>
        <label for="invert"><input type="checkbox" id="invert" checked> Inverser les couleurs</label>
    </div>
</div>`;


////////////////////////////////////////////////////////////////////
// Select elements
////////////////////////////////////////////////////////////////////
let options = document.querySelector('#options');
let options_background = document.querySelector('#options-modal');
let small_radio = document.querySelector("#small");
let normal_radio = document.querySelector("#normal");
let big_radio = document.querySelector("#big");
let transparency_slide = document.querySelector('#transparency');
let hide_options_btn = document.querySelector("#hide-options");
let invert_colors_cb = document.querySelector('#invert');


////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////
// options pop-up visibility
function show_options() {
    options_background.style.display = 'block';
    options.style.display = 'flex';
}
function hide_options() {
    options_background.style.display = 'none';
    options.style.display = 'none';
}

// update the displayer to display the current window size
function update_size() {
    size = window.innerWidth + ' x ' + window.innerHeight;
    size_display.textContent = size;
}

// set the size of the displayer
function update_size_display_size() {
    if (small_radio.checked) {
        size_display.classList.remove('normal', 'big');
        size_display.classList.add('small');
    }
    else if (normal_radio.checked) {
        size_display.classList.remove('small', 'big');
        size_display.classList.add('normal');
    }
    else {
        size_display.classList.remove('small', 'normal');
        size_display.classList.add('big');
    }
}

// update opacity of the displayer
function update_opacity() {
    size_display.style.opacity = transparency_slide.value / 100.0;
}

// update colors of the displayer
function update_colors() {
    if (invert_colors_cb.checked)
        size_display.classList.add('inverted');
    else size_display.classList.remove('inverted');

    if ('color' in size_display.dataset) {
        if (size_display.classList.contains('inverted')) {
            size_display.style.color = 'white';
            size_display.style.backgroundColor = size_display.dataset.color;
        } else {
            size_display.style.color = size_display.dataset.color;
            size_display.style.backgroundColor = 'transparent';
        }
    }
}

////////////////////////////////////////////////////////////////////
// Setup event listeners
////////////////////////////////////////////////////////////////////
window.addEventListener('resize', update_size);
small_radio.addEventListener('change', update_size_display_size);
normal_radio.addEventListener('change', update_size_display_size);
big_radio.addEventListener('change', update_size_display_size);
invert_colors_cb.addEventListener('change', update_colors);
transparency_slide.addEventListener('input', update_opacity);
// options visibility: click on the size display to show options
size_display.addEventListener('click', show_options);
hide_options_btn.addEventListener('click', hide_options);


////////////////////////////////////////////////////////////////////
// Update the displayer on page load
////////////////////////////////////////////////////////////////////
window.onload = () => {
    // Initialize the size displayer
    update_size();
    update_colors();
    update_size_display_size();

    // Set the default opacity if data-opacity is set
    if ('opacity' in size_display.dataset)
        size_display.style.opacity = size_display.dataset.opacity;

    //     // Display a help message
    //     if (!('_message_shown' in localStorage)) {
    //         user_choice = confirm(
    //             `Click on the size displayer to show its option.\n
    // Click "ok" to not show this message again.`);
    //         if (user_choice == true)
    //             localStorage.setItem('_message_shown', true);
    //     }
};
