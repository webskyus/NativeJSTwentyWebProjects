let API_PHOTO_COUNT = 3
const API_KEY = 'DXwuL1suuufHeLDTRREC7GzMLBtW9KXF0_NrbbEt490'
const API_BASE_URL = `https://api.unsplash.com/photos/random/?client_id=${API_KEY}&count=${API_PHOTO_COUNT}`

const imagesContainer = document.querySelector('[data-js-attr="images-container"]')
const preloaderContainer = document.querySelector('[data-js-attr="loader"]')
const errorContainer = document.querySelector('[data-js-attr="error"]')
const photos = []

let ready = false
let totalImagesCount = 0
let imagesLoadedCount = 0
let initialLoad = true

const getPhotos = async () => {
    showPreloader()

    try {
        const response = await fetch(API_BASE_URL)
        const data = await response.json()

        photos.push(...data)
        displayPhotos()
        showPreloader()
    } catch (error) {
        showError()
        showPreloader()
    }
}

const displayPhotos = () => {
    totalImagesCount = photos.length
    imagesLoadedCount = 0

    return photos
        .map((photo) => {
            const {alt_description, links: {html: linkUrl}, urls: {regular: imageUrl}, id} = photo

            return imagesContainer.insertAdjacentHTML('afterbegin', `
                <a href="${linkUrl}" data-js-key="${id}">
                    <img loading="lazy" src="${imageUrl}" alt="${alt_description}" onload="imageLoaded()">
                </a>
            `)
        })
}

const showPreloader = () => {
    preloaderContainer.classList.toggle('infinity-scroll__loader--visible')
    document.body.classList.toggle('scroll-hidden')
}

const showError = () => {
    errorContainer.classList.toggle('infinity-scroll__error--visible')
}

const imageLoaded = () => {
    imagesLoadedCount++
    if (imagesLoadedCount === totalImagesCount) {
        ready = true
        initialLoad = false
        API_PHOTO_COUNT = 10
    }
}

const getDetectPageScroll = () => {
    const bodyHeightValue = document.body.offsetHeight - 1000
    const windowHeightValue = window.innerHeight + window.scrollY

    if (windowHeightValue >= bodyHeightValue && ready) {
        ready = false
        getPhotos()
    }
}



window.addEventListener('load', getPhotos)
window.addEventListener('scroll', getDetectPageScroll)