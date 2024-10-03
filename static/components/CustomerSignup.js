export default{
    template: `
    <div class="d-flex justify-content-center" style="margin-top: 25vh">
        <div class="mb-3 p-5 bg-light" style="width: 35rem;">    
            <h2 class="text-center p-1">Customer Signup</h2>
            <div class="text-danger">{{error}}</div>
            <form>
                <div class="row mb-3">
                    <label for="user-email" class="col-sm-2 col-form-label">Email:</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="user-email" placeholder="name@example.com" v-model="cred.email">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="user-password" class="col-sm-2 col-form-label">Password:</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="user-password" v-model="cred.password">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="user-fullname" class="col-sm-2 col-form-label">Fullname:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="user-fullname" v-model="cred.fullname">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="user-address" class="col-sm-2 col-form-label">Address:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="user-address" v-model="cred.address">
                    </div>
                </div>
                <div class="row mb-3">
                    <label for="user-pincode" class="col-sm-2 col-form-label">Pincode:</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="user-pincode" v-model="cred.pincode">
                    </div>
                </div>
                <div class="text-center">
                    <button class="btn btn-primary mt-2" @click="register">Register</button>
                </div>
            </form>
            <router-link class="nav-link text-center text-warning p-1" to="/login">Login Here</router-link>
        </div>
    </div>
    `,
    data() {
        return {
            cred: {
                email: null,
                password: null,
                fullname: null,
                address: null,
                pincode: null
            },
            error: null
        }
    },
    methods: {
        async register() {
            console.log(this.cred)
            // const res = await fetch('/user-login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(this.cred)
            // })
            // const data = await res.json()
            // if(res.ok){
            //     localStorage.setItem('auth-token', data.token)
            //     localStorage.setItem('role', data.role)
            //     localStorage.setItem('active', data.active)
            //     this.$router.push({path: '/'})
            // }
            // else {
            //     this.error = data.message
            // }
        }
    }
}