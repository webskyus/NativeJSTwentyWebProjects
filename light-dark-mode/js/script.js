const checkboxInput = document.querySelector('.theme-switch-input')
const nav = document.getElementById('nav')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')
const textBox = document.getElementById('text')

const imageMode = (color) => {
    image1.src = `img/undraw_proud_coder_${color}.svg`
    image2.src = `img/undraw_feeling_proud_${color}.svg`
    image3.src = `img/undraw_conceptual_idea_${color}.svg`
}

const toggleDarkLightMode = (isLight) => {
    document.documentElement.setAttribute('data-theme', isLight ? 'light' : 'dark')
    nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)'
    textBox.style.backgroundColor = isLight ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)'
    toggleIcon.children[0].textContent = isLight ? 'Light Mode' : 'Dark Mode'
    toggleIcon.children[1].classList.replace(isLight ? 'fa-moon' : 'fa-sun', isLight ? 'fa-sun' : 'fa-moon')
    imageMode(isLight ? 'light' : 'dark')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
}

const switchTheme = (event) => {
    const {target: {checked}} = event

    toggleDarkLightMode(!checked)
}

checkboxInput.addEventListener('change', switchTheme)
window.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme');
    document.documentElement.setAttribute('data-theme', currentTheme)

    toggleDarkLightMode(currentTheme !== 'dark')
    currentTheme === 'dark' && checkboxInput.setAttribute('checked', true)
})