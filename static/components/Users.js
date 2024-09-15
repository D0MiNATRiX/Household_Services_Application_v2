export default {
    template: `<div>Users page</div>`,
    data() {
        return {
            allUsers: [],
            token: localStorage.getItem('auth-token')
        }
    },
    async mounted() {
        const res = await fetch('/users', {
            headers: {
                "Authentication-Token": token
            }
        })
        const data = await res.json()
        if(res.ok){
            this.allUsers = data
        }
    },
}