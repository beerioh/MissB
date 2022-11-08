import { bookApiService } from "../services/book-list-api.service.js"
export default {

    template: `
    <router-link class="back-btn" to="/book">Back</router-link>
    <section class="book-add">
            <h1 class="book-add-title" >Search for A Book Title</h1>
            <form class="book-add-form" @submit.prevent>
                <input v-model="searchTeaxt" v-on:input="getText" ref="full" type="text" placeholder="Book Title">
                @submit.prevent="onSubmit"
            </form>
        </section>
        <section> 
        <ul  class="book-add-grid" v-if="items">
            <li class="book-title-list"  v-for="n in items.length-1" id="items[n].volumeInfo.id">{{items[n].volumeInfo.title}}{{items[n].volumeInfo.id}} 
            <button class="new-book-btn" v-on:click="bookSubmit">Add Book</button></li>
        </ul>
        </section>
    
    `,
    data() {
        return {
            searchTeaxt: null,
            items: null,
            render:false
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
        getText() {
            if (this.searchTeaxt.length > 4) {
                bookApiService.getBookDetails(this.searchTeaxt)
                    .then(user => this.items= user)
            }   
            
            
        },
        bookSubmit() {
            console.log(arguments)
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
       
   
