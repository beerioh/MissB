export default {
    props: ['book'],
    template: `
        <section class="book-preview" :title="book.title" >
            <h2>{{ book.title }}</h2>
            <h3>{{ formattedNum }}</h3>
            <img :src='imgUrl()' :alt="book.title + 'img'">
        </section>
    `,
    computed: {
        formattedNum() {
            const { language, listPrice: { amount, currencyCode } } = this.book
            return new Intl.NumberFormat(language,
                { style: 'currency', currency: currencyCode }).format(amount)

        },
    },
    methods: {
        imgUrl() {
            return`../../img/${this.book.thumbnail}`
        }
    },
}