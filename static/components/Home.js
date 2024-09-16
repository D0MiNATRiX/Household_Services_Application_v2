import AdminHome from "./AdminHome.js"
import ProfessionalHome from "./ProfessionalHome.js"
import CustomerHome from "./CustomerHome.js"

export default{
    template: `
    <div class="text-danger" v-if="active=='false'">User Not Approved</div>
    <div v-else>
        <AdminHome v-if="userRole=='admin'"/>
        <ProfessionalHome v-if="userRole=='professional'"/>
        <CustomerHome v-if="userRole=='customer'"/>
    </div>
    `,
    data() {
        return {
            userRole: localStorage.getItem('role'),
            active: localStorage.getItem('active')
        }
    },
    components: {
        AdminHome,
        ProfessionalHome,
        CustomerHome
    }
}