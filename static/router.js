import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Users from "./components/Users.js"
import ServiceForm from "./components/ServiceForm.js"
import UpdateServiceForm from "./components/UpdateServiceForm.js"
import CustomerSignup from "./components/CustomerSignup.js"
import ServiceProfessionalSignup from "./components/ServiceProfessionalSignup.js"

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/users', component: Users},
    {path: '/create-service', component: ServiceForm},
    {path: '/update-service', component: UpdateServiceForm},
    {path: '/customer-signup', component: CustomerSignup},
    {path: '/service-professional-signup', component: ServiceProfessionalSignup}
]

export default new VueRouter({
    routes
})