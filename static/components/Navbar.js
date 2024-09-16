export default{
    template: `
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">House Services Application</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link active" aria-current="page" to="/">Home</a>
                    </li>
                    <li class="nav-item" v-if="role=='admin'">
                        <router-link class="nav-link" to="/users">Users</a>
                    </li>
                    <li class="nav-item text-end" v-if="is_login && active=='true'">
                        <button class="nav-link" @click="logout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `,
    data() {
        return {
            role: localStorage.getItem('role'),
            is_login: localStorage.getItem('auth-token'),
            active: localStorage.getItem('active')
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('role')
            localStorage.removeItem('auth-token')
            localStorage.removeItem('active')
            this.$router.push('/login')
        }
    }
}