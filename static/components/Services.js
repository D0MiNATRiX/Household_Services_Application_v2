export default {
    template: `
    <div>
        <div class="p-2" v-if="role == 'customer'">
            <div class="card bg-light" style="width: 15rem;">
                <div class="card-body">
                    <h5 class="card-title">{{service.name}}</h5>
                    <h6 class="card-text">{{service.description}}</h6>
                    <h6 class="card-link">{{service.time_required}}</h6>
                    <h6 class="card-link">Rs. {{service.price}}</h6>
                    <button class="btn btn-primary" @click="request">Request</button>
                </div>
            </div>
        </div>
        <div class="p-2" v-if="role == 'admin'">
            <h2>Services</h2>
            <div class="card text-center" style="width: 77rem;">
                <div class="card-header">
                    ID | Service Name | Base Price | Action
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">An item</li>
                </ul>
            </div>
        </div>
    </div>
    `,
    props: ['service'],
    data() {
        return {
            role: localStorage.getItem('role')
        }
    },
    methods: {
        async request() {
            alert('Service Requested')
        }
    }
}