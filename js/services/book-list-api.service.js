import {storageService} from"../services/async-storage.service.js"
export const bookApiService = {
    getBookDetails,
}
let inputTxt=""
const STORAGE_KEY = 'bookListApi'

const bookListStorage = storageService.query(STORAGE_KEY) || {}

// getBookDetails(inputTxt)
// .then(book => console.log('Got book', book))

// setTimeout(()=>{
//     getBookDetails(inputTxt)
//     .then(book => console.log('Got book', book))
// }, 1250)


// Get book data from network or cache - return a promise
function getBookDetails(inputTxt) {
    if (bookListStorage[inputTxt]) {
        console.log('No need to fetch, retrieving from Cache')
        // return bookCache[inputTxt]
        return Promise.resolve(bookListStorage[inputTxt])
    }
    if (inputTxt) {
        const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${inputTxt}`
        return fetch(url).then(res => res.json())
            .then((book) => {
                console.log(book.items)
                let list=book.items
                storageService.save(STORAGE_KEY, list)

                // Cache Invalidation after 5 Seconds
                // setTimeout(()=>{
                //     delete bookCache[inputTxt]
                // }, 5000)

                return list
            })
            .catch(() => {
                throw new Error('Could not find book: ' + inputTxt)
            })
    }
}

