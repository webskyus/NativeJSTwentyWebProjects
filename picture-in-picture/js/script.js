const videoElement = document.querySelector('[data-js-attr="video"]')
const button = document.querySelector('[data-js-attr="button"]')

const selectMediaStream = async () => {
    try {
        videoElement.srcObject = await navigator.mediaDevices.getDisplayMedia()

        videoElement.onloadedmetadata = () => videoElement.play()
        videoElement.removeAttribute('hidden')
    } catch (err) {
        console.log('err', err)
    }
}

button.addEventListener('click', async () => {
    button.disabled = true
    await videoElement.requestPictureInPicture()
    button.disabled = false
})


selectMediaStream()