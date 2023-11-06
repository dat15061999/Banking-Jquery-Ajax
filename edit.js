function openEditModal(customer) {
    const fullName = document.querySelector('#editName');
    const email = document.querySelector('#editEmail');
    const phone = document.querySelector('#editPhone');
    const address = document.querySelector('#editPddress');
    const balance = document.querySelector('#editBalance');
    const id = document.querySelector('#editID');
    fetch(`http://localhost:3300/customer/${customer}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // Đặt giá trị của các trường trong modal từ dữ liệu khách hàng
            fullName.value = data.fullName;
            email.value = data.email;
            phone.value = data.phone;
            address.value = data.address;
            id.value = data.id;
            balance.value = data.balance;

            const modal = new bootstrap.Modal(document.getElementById("editCustomerModal"));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const myButtonEdit = document.querySelector('#edit');
myButtonEdit.addEventListener('click', function () {
    myFunction();
});


function myFunction() {
    const id = document.querySelector('#editID').value;
    const fullName = document.querySelector('#editName').value;
    const email = document.querySelector('#editEmail').value;
    const phone = document.querySelector('#editPhone').value;
    const address = document.querySelector('#editPddress').value;
    const balance = document.querySelector('#editBalance').value;
    const deleted = 0;
    const data = {
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    };
    fetch(`http://localhost:3300/customer/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả từ server
            window.location.reload();
            alert("Edit customer sucessfully!")
        })
        .catch(error => {
            console.error('Error:', error);
        });
};