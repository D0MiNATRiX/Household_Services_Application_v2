export default{
    template: `
    <div>
        <h1 class="text-danger text-center">Welcome Admin</h1>
        <h2 class="text-center">Services</h2>
        <div class="d-flex justify-content-center p-1">
            <button type="button" class="btn btn-outline-success"><router-link class="nav-link p-1" to="/create-service">+ New Service</router-link></button>
        </div>
        <div class="card text-center" style="width: 77rem;">
            <div class="card-header">
                <div class="container text-center">
                    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                        <div class="col">ID</div>
                        <div class="col">Service Name</div>
                        <div class="col">Base Price (Rs.)</div>
                        <div class="col">Action</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}