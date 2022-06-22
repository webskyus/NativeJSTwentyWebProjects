"use strict";

const API_VOICE_KEY = '9af0687a585b47d6ad4f71da7426f69f'
const button = document.querySelector('[data-js-attr="button"]');
const audioElement = document.querySelector('[data-js-attr="audio"]');

const toggleButton = () => {
    button.disabled = !button.disabled
}

const initVoiceSpeech = (text) => {
    VoiceRSS.speech({
        key: API_VOICE_KEY,
        src: text,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get from joke api
const getJokes = async () => {
    let jokeText = ''
    const API = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,sexist,explicit'

    try {
        const res = await fetch(API)
        const data = await res.json()
        const {joke, setup, delivery} = await data

        if (setup) jokeText = `${setup} ... ${delivery}`
        else jokeText = joke

        initVoiceSpeech(jokeText)
        toggleButton()
    } catch (err) {
        console.log('error', err)
    }
}

button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)