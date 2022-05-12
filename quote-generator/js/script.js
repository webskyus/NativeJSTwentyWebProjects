const API_BASE_URL = 'https://type.fit/api'
const API_QUOTE_URL = `${API_BASE_URL}/quotes`
const TWITTER_INTENT_URL = 'https://twitter.com/intent/tweet'
const quotes = []

const quoteContainer = document.querySelector('[data-js-attr="quote-container"]')
const quoteText = document.querySelector('[data-js-attr="quote-text"]')
const quoteAuthor = document.querySelector('[data-js-attr="quote-author"]')
const nextQuoteBtn = document.querySelector('[data-js-attr="new-quote-btn"]')
const twitterShareBtn = document.querySelector('[data-js-attr="twitter"]')


const showLoadingSpinner = () => {
    quoteContainer.classList.add('quote-container-preloader')
}

const removeLoadingSpinner = () => {
    quoteContainer.classList.remove('quote-container-preloader')
}

const getNewQuotes = () => {
    const randomNumber = Math.floor(Math.random() * quotes.length)
    const randomQuote = quotes[randomNumber]
    const {text, author} = randomQuote
    const authorCheck = author ? author : 'Nameless Author'
    let serverTimeoutImitate

    showLoadingSpinner()
    quoteText.textContent = text
    quoteAuthor.textContent = authorCheck
    serverTimeoutImitate = setTimeout(() => {
        removeLoadingSpinner()
        clearTimeout(serverTimeoutImitate)
    }, 1 * 250)
}

const getQuotes = async () => {
    try {
        const response = await fetch(API_QUOTE_URL)
        const json = await response.json()
        quotes.push(...json)

        newQuotes()
    } catch (e) {
        console.log('getQuotes Error', e)
        getQuotes()
    }
}

const getTweetQuoteShare = () => {
    const twitterUrl = `${TWITTER_INTENT_URL}?text=${quoteText.textContent} - ${quoteAuthor.textContent}`
    window.open(twitterUrl, '_blank')
}

getQuotes()
nextQuoteBtn.addEventListener('click', getNewQuotes)
twitterShareBtn.addEventListener('click', getTweetQuoteShare)
