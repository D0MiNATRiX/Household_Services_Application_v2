import Home from "./components/Home.js"
import Login from "./components/Login.js"
import Users from "./components/Users.js"
import ServiceForm from "./components/ServiceForm.js"
import CustomerSignup from "./components/CustomerSignup.js"

const routes = [
    {path: '/', component: Home, name: 'Home'},
    {path: '/login', component: Login, name: 'Login'},
    {path: '/users', component: Users},
    {path: '/create-service', component: ServiceForm},
    {path: '/customer-signup', component: CustomerSignup}
]

export default new VueRouter({
    routes
})