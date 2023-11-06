`<div class="modal fade" id="edit${customer.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
<div class="modal-dialog modal-xl">
    <div class="modal-content">                       
        <div class="modal-body">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Edit Customer</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form method="post">
                <div class="row mb-3 mt-3">
                    <div class="col-lg-6">
                        <label for="fullName" class="form-label">Full Name</label>
                        <input type="text" class="form-control" id="fullName" value="${customer.fullName}" name = "fullName">                                       
                    </div>
                    <div class="col-lg-6">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" class="form-control" id="email" value="${customer.email}" name = "email"> 
                    </div>
                </div>
                    <div class="row mb-3">
                        <div class="col-lg-6">
                            <label for="phone" class="form-label">Phone</label>
                            <input type="tel" class="form-control" id="phone" value="${customer.phone}" name = "phone">                                           
                        </div>
                        <div class="col-lg-6">
                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" id="address" value="${customer.address}" name="address">
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-lg-3 modal-footer">
                            <button type="submit" class="btn btn-outline-success">                                               
                                <i class="far fa-edit">Update</i>
                            </button>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>                                    
            </form>
        </div>                       
    </div>
</div>
</div>                     `