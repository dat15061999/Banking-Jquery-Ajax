//gan su kien click cho nut create

const createCus = document.querySelector('#createButton');
createCus.addEventListener('click', function () {
    addCus();
    closeModal('createCustomerModal');
});



async function addCus() {
    const fullName = document.querySelector('#fullName').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const address = document.querySelector('#address').value;
    const balance = 0;
    const deleted = 0;
    const data = {
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    };
    await fetch('http://localhost:3300/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả từ server
            return logCustomers(); // Gọi lại hàm logCustomers để cập nhật danh sách
        })
        .then(datas => {
            renderViewCustomers(datas);// Sau khi có danh sách mới, cập nhật trang

        })
        .catch(error => {
            console.error('Error:', error);
        });


};

function createCustomer() {
    // Sử dụng Bootstrap để mở modal
    var modal = new bootstrap.Modal(document.getElementById("createCustomerModal"));
    modal.show();
}
function closeModal(elem) {
    document.getElementById(elem).style.display = "none"
    document.getElementById(elem).classList.remove("show")
    document.querySelector('.modal-backdrop').remove();
    document.querySelector('body').setAttribute('style', 'overflow: none')
}






function messageCreate(message) {
    // Select the toast element
    var toastEl = document.querySelector('.toast');

    // Set the message content
    var messageToast = document.querySelector("#toastMessage");
    messageToast.innerText = message;
    // messageToast.textContent = message;

    // Add the 'show' class to the toast element
    toastEl.classList.add('show');

    // You can also remove the 'show' class after a certain time to automatically hide the toast
    setTimeout(function () {
        toastEl.classList.remove('show');
    }, 3000); // Hide the toast
}

function renderCus(data) {
    const renderCustomer = document.getElementById("render-customer");
    let tableContent = `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.fullName}</td>
                    <td>${customer.email}</td>
                    <td>${customer.phone}</td>
                    <td>${customer.address}</td>
                    <td>${customer.balance}</td>
                    <td>                        
                        <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editCustomerModalLabel" onclick="openEditModal(${customer.id})">
                                <i class="far fa-edit"></i>
                        </button>                        
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#depositCustomerModalLabel" onclick="openDepositModal(${customer.id})">
                                <i class="fas fa-plus"></i>
                        </button>
                    </td>
                    <td>                        
                        <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#withdrawCustomerModal" onclick = "openWithdrawtModal(${customer.id})">
                                <i class="fas fa-minus"></i>
                        </button>                        
                    </td>
                    <td>                        
                        <button type="button" class="btn btn-outline-primary" onclick = "openTransfertModal(${customer.id})">
                            <i class="fas fa-exchange-alt"></i>
                        </button>                        
                    </td>
                    <td>
                        <button type="button" class="btn btn-outline-danger">
                            <i class="fas fa-ban"></i>
                        </button>                    
                    </td>
                </tr>           
    `;


    renderCustomer.innerHTML = tableContent;
}


async function logCustomers() {
    const response = await fetch("http://localhost:3300/customer");
    const movies = await response.json();
    return movies
}

function renderViewCustomers(movies) {
    const renderCustomer = document.getElementById("render-customer");
    let tableContent = "";

    movies.forEach(customer => {
        tableContent += `
                <tr>
                            <td>${customer.id}</td>
                            <td>${customer.fullName}</td>
                            <td>${customer.email}</td>
                            <td>${customer.phone}</td>
                            <td>${customer.address}</td>
                            <td>${customer.balance}</td>
                            <td>                        
                                <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#editCustomerModalLabel" onclick="openEditModal(${customer.id})">
                                        <i class="far fa-edit"></i>
                                </button>                        
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#depositCustomerModalLabel" onclick="openDepositModal(${customer.id})">
                                        <i class="fas fa-plus"></i>
                                </button>
                            </td>
                            <td>                        
                                <button type="button" class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#withdrawCustomerModal" onclick = "openWithdrawtModal(${customer.id})">
                                        <i class="fas fa-minus"></i>
                                </button>                        
                            </td>
                            <td>                        
                                <button type="button" class="btn btn-outline-primary" onclick = "openTransfertModal(${customer.id})">
                                    <i class="fas fa-exchange-alt"></i>
                                </button>                        
                            </td>
                            <td>
                                <button type="button" class="btn btn-outline-danger">
                                    <i class="fas fa-ban"></i>
                                </button>                    
                            </td>
                </tr>           
    `;
    });

    renderCustomer.innerHTML = tableContent;
}

async function main() {
    const movies = await logCustomers();
    renderViewCustomers(movies);

}

main();