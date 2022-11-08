import { bookService } from '../services/book-service.js'

import bookFilter from '../cmps/book-filter.cmp.js'
import bookDetails from './book-details.cmp.js'
import bookList from '../cmps/book-list.cmp.js'

export default {
    template: `
    <section class="book-app">
        <book-filter @filter="filter"/>
        <router-link to="/book/edit">Add a book...</router-link>
        <book-list v-if="books"
            :books="booksToShow"
            @selected="selectBook" 
            @remove="removeBook"/>

        // <book-details 
        //     v-if="selectedBook" 
        //     :book="selectedBook"
        //     @close="selectedBook = null" 
        // />
        // <car-edit @saved="carSaved"/>  
    </section>
    `,
    created() {
        bookService.query()
            .then(books => {
            this.books=books
        })
    },
    data() {
        return {
            books: null,
            // selectedBook: null,
            filterBy: null,
        }
    },
    methods: {
        removeBook(bookId) {
            bookService.remove(bookId)
            .then(() => {
                    const idx = this.books.findIndex(book => book.id === bookId)
                    this.books.splice(idx, 1)
                    
                    const msg = {
                        txt: `Book ${bookId} deleted...`,
                        type: 'success',
                    }
                    eventBus.emit('user-msg', msg)
                })
            // const idx = this.books.findIndex(book => book.id === bookId)
            // this.books.splice(idx, 1)
        },
        selectBook(book) {
            this.selectedBook = book
        },
        filter(filterBy) {
            this.filterBy = filterBy
        }
        //  bookSaved(book){
        //     this.books.push(book)
        // },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books
            const { title, toPrice, fromPrice } = this.filterBy
            const regex = new RegExp(title, 'i')
            return this.books.filter(({ title, listPrice: { amount } }) => (regex.test(title))
                && (amount < toPrice)
                && (amount > fromPrice))
        }
    },
    components: {
        bookFilter,
        bookDetails,
        bookList,
    }
}