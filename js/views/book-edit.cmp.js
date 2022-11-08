import { bookService } from "../services/book-service.js"
import { eventBus } from "../services/event-bus.service.js"
import { utilService } from '../services/util-service.js'

export default {
    template: `
        <section class="book-review">
            <h1>Write a Review</h1>
            <form class="book-review-form" @submit.prevent="save">
                <input  ref="full" type="text" placeholder="Full Name" v-model="newReview.reviewer">
                <textarea class="review-textarea" type="text" v-model="newReview.review"></textarea>
                <label for="start">Read at:</label>
                <input type="date" id="start" name="trip-start"  
                  min="2000-01-01" :max="new Date().toISOString().slice(0,10)" v-model="newReview.readAt">
                  <label class="rating-label">
                <div class="stars">
                        <input v-for="n in 5" type="radio" @click="info(n)" name="rating"/>
                        
                    <i></i>
                    </div>
                    </label>
                <button ref="btn">Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            newReview: {
                reviewId: utilService.makeId(),
                reviewer: 'Book Reader',
                review: null,
                readAt: new Date().toISOString().slice(0,10),
                rating: null
            }
        }
    },
    mounted() {
        this.$refs.full.focus()
    },
    // computed: {
    //     info() {
    //         console.log(arguments)
    //     }
    // },
    methods: {
         info(rate) {
            this.newReview.rating=rate
        },
        save(){
            bookService.addReview(this.$route.params.id, this.newReview)
                .then(() => {
                    const msg = {
                        txt: `Review saved${this.$route.params.id}`,
                        type: 'success',
                        timeout: 4000,
                    }
                    eventBus.emit('user-msg', msg)
                    this.$router.push('/book')
                })
        }
    }
}
