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
            <div class="card text-center" style="width: 76rem;">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <div class="container text-center">
                            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                <div class="col">{{service.id}}</div>
                                <div class="col">{{service.name}}</div>
                                <div class="col">{{service.price}}</div>
                                <div class="col">
                                    <button class="btn btn-warning" @click="update(service.id)">Edit</button>
                                    <button class="btn btn-danger" @click="del(service.id)">Delete</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `,
    props: ['service'],
    data() {
        return {
            token: localStorage.getItem('auth-token'),
            role: localStorage.getItem('role'),
        }
    },
    methods: {
        async request() {
            alert('Service Requested')
        },
        async del(id) {
            const res = await fetch(`delete/service/${id}`, {
                headers: {
                    'Authentication-Token': this.token
                }
            })
            const data = await res.json()
            if(res.ok){
                alert(data.message)
                location.reload()
            }
        },
        async update(id) {
            localStorage.setItem('update_service_id', id)
            this.$router.push({path: `/update-service`})
        }
    },
    async mounted() {
        const res = await fetch(`/api/update/service/${localStorage.getItem('update_service_id')}`, {
            headers: {
                'Authentication-Token': this.token
            }
        })
        const data = await res.json()
        if(res.ok){
            localStorage.setItem('service_name', data.name)
            localStorage.setItem('service_price', data.price)
            localStorage.setItem('service_time', data.time_required)
            localStorage.setItem('service_description', data.description)
            localStorage.setItem('reload', 0)
        }
    }
}