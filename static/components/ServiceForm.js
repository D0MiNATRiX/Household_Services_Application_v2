export default {
    template: `
    <div>
        <input type="text" placeholder="Service Name" v-model="service.name"/>
        <input type="text" placeholder="Service Price in Rs." v-model="service.price"/>
        <input type="text" placeholder="Time Required" v-model="service.time_required"/>
        <input type="text" placeholder="Service Description" v-model="service.description"/>
        <button @click="createService">Create Service</button>
    `,
    data() {
        return {
            service: {
                name: null,
                price: null,
                time_required: null,
                description: null
            },
            token: localStorage.getItem('auth-token')
        }
    },
    methods: {
        async createService(){
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: {
                    'Authentication-Token': this.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.service)
            })
            const data = await res.json()
            if(res.ok){
                alert(data.message)
            }
        }
    }
}