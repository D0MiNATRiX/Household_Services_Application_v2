export default {
    template: `
    <div class="p-2">
        <div class="card bg-light" style="width: 15rem;">
            <div class="card-body">
                <h5 class="card-title">{{service.name}}</h5>
                <h6 class="card-text">{{service.description}}</h6>
                <h6 class="card-link">{{service.time_required}}</h6>
                <h6 class="card-link">Rs. {{service.price}}</h6>
                <button class="btn btn-primary">Book</button>
            </div>
        </div>
    </div>
    `,
    props: ['service']
}