import { eventBus } from '../services/event-bus.service.js'

export default {
    template: `
        <section class="about-page">
            <h1>About page</h1>
            <button @click="emit">Emit test event</button>
        </section>
    `,
    methods: {
        emit(){
            eventBus.emit('user-msg', {num: 43, txt: 'mama&doda'})
        }
    }
}