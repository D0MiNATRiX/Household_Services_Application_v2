import AdminHome from "./AdminHome.js"
import ProfessionalHome from "./ProfessionalHome.js"
import CustomerHome from "./CustomerHome.js"
import Services from "./Services.js"

export default{
    template: `
    <div class="text-danger" v-if="active=='false'">User Not Approved</div>
    <div v-else>
        <AdminHome v-if="userRole=='admin'"/>
        <ProfessionalHome v-if="userRole=='professional'"/>
        <CustomerHome v-if="userRole=='customer'"/>
        <div v-if="userRole=='admin'">
            <Services v-for="service in services" :service = "service" v-bind:key="service.id"/>
        </div>
        <div v-if="userRole=='customer'" class="d-flex flex-row">
            <Services v-for="service in services" :service = "service" v-bind:key="service.id"/>
        </div>
    </div>
    `,
    data() {
        return {
            userRole: localStorage.getItem('role'),
            active: localStorage.getItem('active'),
            token: localStorage.getItem('auth-token'),
            services: []
        }
    },
    components: {
        AdminHome,
        ProfessionalHome,
        CustomerHome,
        Services
    },
    async mounted() {
        const res = await fetch('/api/services', {
            headers: {
                'Authentication-Token': this.token
            }
        })
        const data = await res.json()
        if(res.ok) {
            this.services = data
        }
        else {
            alert(data.message)
        }
    }
}