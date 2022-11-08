import longText from '../cmps/long-text.cmp.js'
import { bookService } from '../services/book-service.js'

export default {
    // props: ['book'],
    template: `
        <section v-if="book" class="book-details" id="details">
            <h2>{{ book.title }}</h2>
            <h4>Language: {{ book.language }}</h4>
            <h4>Author</h4>
            <p v-for="author in book.authors">{{ author }}</p>
            <h4>Published Date: {{ book.publishedDate }}, {{ howOld }} </h4>
            <h4>Pages: {{ book.pageCount }}, {{ howLong }} </h4>
            <h4>Categories:</h4>
            <p v-for="categorie in book.categories">{{ categorie }}</p>
            <long-text :txt="book.description" :maxLength="100"/>
            <img :src="imgUrl" alt="">
            <img v-bind:class="(book.listPrice.isOnSale)? 'on-sale-img' : 'hide'">
            <h4 :class="priceStyle">{{ price }}</h4>
            <router-link to="/book">Back</router-link>
            <ul v-if="book.bookReview" class="details-review" v-for="review in book.bookReview"><li>{{ review }}</li></ul>
        </ul>
    `,
    data() {
        return {
           book:null,
        }
    },
    created(){
        bookService.get(this.$route.params.id)
            .then(book => this.book = book)
    },
    computed: {
        howLong() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount > 200) return 'Decent reading'
            return ' Light Reading'
        },
        howOld() {
            if (((new Date().getFullYear()) - (this.book.publishedDate)) > 10) return 'Veteran Book'
            if (((new Date().getFullYear()) - (this.book.publishedDate)) <= 1) return 'New!'
            return ''
        },
        price() {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: this.book.listPrice.currencyCode }).format(this.book.listPrice.amount)
        },
        priceStyle() {
            const { listPrice: { amount } } = this.book
            return { 'low-price': amount < 20, 'high-price': amount > 150 }
        },
        imgUrl(){
            return `img/${this.book.thumbnail}`
        },
    },
    components: {
        longText
    }



}