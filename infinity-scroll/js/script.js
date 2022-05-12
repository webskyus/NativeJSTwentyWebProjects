const API_PHOTO_COUNT = 3
const API_KEY = 'DXwuL1suuufHeLDTRREC7GzMLBtW9KXF0_NrbbEt490'
const API_BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${API_PHOTO_COUNT}`

const imagesContainer = document.querySelector('[data-js-attr="images-container"]')
const preloaderContainer = document.querySelector('[data-js-attr="loader"]')
const photos = []

const getPhotos = async () => {
    showPreloader()

    try {
        const response = await fetch(API_BASE_URL)
        const data = await response.json()

        photos.push(...data)
        displayPhotos()
        showPreloader()
        observeImages()
    } catch (error) {
        console.log('error')
        showPreloader()
    }
}

const displayPhotos = () => {
    return photos.map((photo, index) => {
        const {alt_description, links: {html: linkUrl}, urls: {regular: imageUrl}} = photo
        return imagesContainer.insertAdjacentHTML('afterbegin', `
            <a href="${linkUrl}" data-js-key="${index}">
                <img src="${imageUrl}" alt="${alt_description}">
            </a>
        `)
    })
}

const showPreloader = () => {
    preloaderContainer.classList.toggle('infinity-scroll__loader--visible')
}

const observeImages = () => {
    const images = imagesContainer.querySelectorAll('a')
    const observer = new IntersectionObserver((entries, observer) => {
        console.log('scrolled')
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 1
    })
    console.log('images', images)
    images.forEach(img => observer.observe(img))
}

window.addEventListener('load', getPhotos)
