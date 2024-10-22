export default{
    template: `
    <div>
        <h1 class="text-center text-danger">Welcome Professional</h1>
        <h2 class="text-center">Current Service Requests</h2>
        <div class="card text-center" style="width: 77rem;">
            <div class="card-header">
                <div class="container text-center">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
                        <div class="col">ID</div>
                        <div class="col">Service Name</div>
                        <div class="col">Date Of Request</div>
                        <div class="col">Status</div>
                        <div class="col">Action</div>
                    </div>
                </div>
            </div
        </div>
        <div class="card text-center" style="width: 77rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(service_request,index) in allServiceRequests" v-if="service_request.service_status=='requested'">
                    <div class="container text-center">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
                            <div class="col">{{service_request.id}}</div>
                            <div class="col" v-for="(service,index) in allServices" v-if="service.id==service_request.service_id">{{service.name}}</div>
                            <div class="col">{{service_request.date_of_request}}</div>
                            <div class="col">{{service_request.service_status}}</div>
                            <div class="col">
                                <button class="btn btn-success" v-if="service_request.service_status!='closed'" @click="accept(service_request.id)">Accept</button>
                                <button class="btn btn-danger" v-if="service_request.service_status!='closed'" @click="edit(service_request.id)">Reject</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    <div>
        <h2 class="text-center p-2">Closed Service Requests</h2>
        <div class="card text-center" style="width: 77rem;">
            <div class="card-header">
                <div class="container text-center">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
                        <div class="col">ID</div>
                        <div class="col">Service Name</div>
                        <div class="col">Date Of Request</div>
                        <div class="col">Rating</div>
                        <div class="col">Remarks</div>
                    </div>
                </div>
            </div
        </div>
        <div class="card text-center" style="width: 77rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(service_request,index) in allServiceRequests" v-if="service_request.service_status=='closed' && service_request.professional_id==id">
                    <div class="container text-center">
                        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5">
                            <div class="col">{{service_request.id}}</div>
                            <div class="col" v-for="(service,index) in allServices" v-if="service.id==service_request.service_id">{{service.name}}</div>
                            <div class="col">{{service_request.date_of_request}}</div>
                            <div class="col">{{service_request.service_status}}</div>
                            <div class="col">
                                <button class="btn btn-danger" v-if="service_request.service_status!='closed'" @click="close(service_request.id)">Close Request</button>
                                <button class="btn btn-warning" v-if="service_request.service_status=='closed'" @click="edit(service_request.id)">Edit Request</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `,
    data() {
        return {
            allServiceRequests: [],
            allServices: [],
            id: localStorage.getItem('id'),
            error: null,
            customer: {
                "user_id":null
            }
        }
    },
    methods: {
        async accept(id) {
            localStorage.setItem("service_request_id", id)
            localStorage.setItem("reload", 0)
            this.$router.push({path: `/service-remarks`})
        },
        async edit(id) {
            localStorage.setItem("service_request_id", id)
            localStorage.setItem("reload", 0)
            this.$router.push({path: `/update-service-remarks`})
        }
    },
    async mounted() {
        const res = await fetch('/api/request/service')
        const data = await res.json()
        if(res.ok){
            this.allServiceRequests = data.service_requests
            this.allServices = data.services
        }
    }
}