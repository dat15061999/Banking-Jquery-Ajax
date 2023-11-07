//gan su kien click cho nut create
const modalCreate = new bootstrap.Modal($("#createCustomerModal"));
const loading = $("#loading");
const modalEdit = new bootstrap.Modal($("#editCustomerModal"));



$('#createCustomerModal').on('hidden.bs.modal', () => {
    $('#frmCreate').trigger('reset')
    $('#frmCreate input').removeClass('error')
    $('#frmCreate label.error').remove()
})
$('#frmCreate').validate({
    rules: {
        fullName: {
            required: true
        }
    },
    messages: {
        fullName: {
            required: 'FullName is required'
        }
    }

})

$('#createButton').on('click', () => {
    addCus();
})

async function addCus() {
    const fullName = $('#fullName').val();
    const email = $('#email').val();
    const phone = $('#phone').val();
    const address = $('#address').val();
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
    modalCreate.hide(); // Tắt modal thay vì vô hiệu hóa

    loading.removeClass('hide');

    try {
        await $.ajax({
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'POST',
            url: "http://localhost:3300/customer",
            data: JSON.stringify(data)
        });

        // Xử lý kết quả từ server
        const datas = await logCustomers(); // Gọi lại hàm logCustomers để cập nhật danh sách
        renderViewCustomers(datas); // Sau khi có danh sách mới, cập nhật trang
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setTimeout(() => {
            loading.addClass('hide');
            successAlert("Created Customer successfully!", "success");
        }, 3000);

    }
}


function createCustomer() {
    // Sử dụng Bootstrap để mở modal
    modalCreate.show();
}
function closeModalView(elem) {
    document.getElementById(elem).style.display = "none"
    document.getElementById(elem).classList.remove("show")
    document.querySelector('.modal-backdrop').remove();
    document.querySelector('body').setAttribute('style', 'overflow: none')
}

async function logCustomers() {
    return await $.ajax({
        url: "http://localhost:3300/customer"
    })
}

function renderViewCustomers(customerList) {
    const renderCustomer = $("#render-customer");
    renderCustomer.empty();
    let tableContent = "";

    customerList.forEach(customer => {
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

    renderCustomer.prepend(tableContent);
}

async function main() {
    const customerList = await logCustomers();
    renderViewCustomers(customerList);
}

main();

function successAlert(message, content) {
    swal.fire({
        position: "top-end",
        icon: content,
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}


// edit

function openEditModal(customer) {
    const fullName = $('#editName');
    const email = $('#editEmail');
    const phone = $('#editPhone');
    const address = $('#editPddress');
    const balance = $('#editBalance');
    const id = $('#editID');


    $.ajax(
        {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'Get',
            url: `http://localhost:3300/customer/${customer}`,

        }
    )
        .done((data) => {

            fullName.val(data.fullName);
            email.val(data.email);
            phone.val(data.phone);
            address.val(data.address);
            id.val(data.id);
            balance.val(data.balance);
            modalEdit.show();
        })
        .fail(error => {
            console.error('Error:', error);
        });

}

$('#edit').on('click', function () {
    updateCustomer();
});


async function updateCustomer() {
    const id = $('#editID').val();
    const fullName = $('#editName').val();
    const email = $('#editEmail').val();
    const phone = $('#editPhone').val();
    const address = $('#editPddress').val();
    const balance = $('#editBalance').val();
    const deleted = 0;
    const data = {
        fullName,
        email,
        phone,
        address,
        balance,
        deleted
    };
    modalEdit.hide(); // Tắt modal thay vì vô hiệu hóa

    loading.removeClass('hide');
    try {
        await $.ajax({
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            method: 'PATCH',
            url: "http://localhost:3300/customer/" + id,
            data: JSON.stringify(data)
        });

        // Xử lý kết quả từ server
        const datas = await logCustomers(); // Gọi lại hàm logCustomers để cập nhật danh sách
        renderViewCustomers(datas); // Sau khi có danh sách mới, cập nhật trang
    } catch (error) {
        console.error('Error:', error);
    } finally {
        setTimeout(() => {
            loading.addClass('hide');
            successAlert("Updated Customer successfully!", "success");
        }, 3000);

    }
};


//deposit
const myButtonDeposit = $('#depositButton');
const modalDepo = new bootstrap.Modal($("#depositCustomerModal"));

async function openDepositModal(customerId) {
    const fullName = $('#depositfullName');
    const email = $('#depositemail');
    const balance = $('#depositBalance');
    const id = $('#depositID');


    const data = await getById(customerId);
    // Đặt giá trị của các trường trong modal từ dữ liệu khách hàng
    fullName.val(data.fullName);
    email.val(data.email);
    id.val(data.id);
    balance.val(data.balance);

    modalDepo.show();
}

myButtonDeposit.on('click', () => {
    depositCustomer();
});


function depositCustomer() {
    const customer_id = parseFloat($('#depositID').val());
    const balanceOld = parseFloat($('#depositBalance').val());
    const depositAmount = parseFloat($('#depositAmount').val());
    if (isNaN(depositAmount) || depositAmount < 0 || depositAmount == 0) {
        successAlert("Deposit's value invalid !", "error");
        return;
    }
    const balance = balanceOld + depositAmount;
    const depositData = {
        customer_id: customer_id,
        depositAmount: depositAmount
    };

    const updateData = {
        balance: balance
    };
    modalDepo.hide(); // Tắt modal thay vì vô hiệu hóa

    loading.removeClass('hide');
    $.ajax({
        url: 'http://localhost:3300/deposit',
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(depositData),
        success: function (dataDepo) {
            // Xử lý kết quả từ server sau khi nạp tiền

            $.ajax({
                url: `http://localhost:3300/customer/${customer_id}`,
                type: 'PATCH',
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(updateData),
                success: function (dataDepo) {
                    setTimeout(() => {
                        loading.addClass('hide');
                        successAlert("Deposit's value successfully !", "success");
                        main();
                    }, 3000);
                },
                error: function (error) {
                    console.error('Error updating customer balance:', error);
                }
            });
        },
        error: function (error) {
            console.error('Error depositing customer:', error);
        }
    });
}


// transfer


$("#transferAmount").on("input", function () {
    var transferAmount = parseFloat(this.value);
    var feesValue = parseFloat($("#fees").val());
    var totalAmount = transferAmount + (transferAmount * (feesValue / 100));
    var feesAmount = transferAmount * (feesValue / 100);
    $("#transactionAmount").setAttribute("value", totalAmount);
    $("#feesAmount").setAttribute("value", feesAmount);
});

const transferCustomerModal = new bootstrap.Modal($("#transferCustomerModal"));

async function openTransfertModal(customerId) {
    const fullName = $('#transferFullName');
    const email = $('#transferEmail');
    const balance = $('#transferBalance');
    const phone = $('#transferPhone');
    const id = $('#transferID');
    const fees = $('#fees');

    const data = await getById(customerId);
    // Đặt giá trị của các trường trong modal từ dữ liệu khách hàng
    fullName.val(data.fullName);
    email.val(data.email);
    balance.val(data.balance);
    phone.val(data.phone);
    fees.val(10);
    id.val(data.id);
    // Hiển thị modal chuyển tiền
    getAllCustomers(customerId);
    transferCustomerModal.show();

    // Gọi hàm để lấy danh sách khách hàng cho phần chọn người nhận


}

async function getAllCustomers(CustomerID) {
    const response = await fetch("http://localhost:3300/customer");
    const customers = await response.json();
    renderCustomers(customers, CustomerID);
}

function renderCustomers(customers, CustomerID) {
    const recipientCustomer = document.querySelector("#recipientCustomer");
    let options = "";

    customers.forEach(customer => {
        if (customer.id != CustomerID) {
            options += `<option value="${customer.id}" >(${customer.id}) ${customer.fullName}</option>`;
        }
    });

    recipientCustomer.innerHTML = options;
}

async function transfer() {
    const senderCustomer = parseFloat(document.querySelector('#transferID').value);
    const transactionAmount = parseFloat(document.querySelector('#transactionAmount').value);
    const transferAmount = parseFloat(document.querySelector('#transferAmount').value);
    const feesAmount = parseFloat(document.querySelector('#feesAmount').value);
    const fees = parseFloat(document.querySelector('#fees').value);
    const recipientCustomer = parseFloat(document.querySelector('#recipientCustomer').value);

    const balanceSender = await getBalanceById(senderCustomer);
    const minusSender = balanceSender - transactionAmount;
    const balanceRecipient = await getBalanceById(recipientCustomer);
    const addRecipient = balanceRecipient + transferAmount;

    if (transferAmount == 0 || transactionAmount == 0 || isNaN(transferAmount)) {
        alert("Transfer amount invalid!");
        return;
    }
    else if (balanceSender < 0 || balanceRecipient < 0 || isNaN(balanceSender) || isNaN(balanceRecipient)) {
        alert("Balance's customer invalid!");
        return;
    }
    const dataSender = {
        balance: minusSender
    }
    const dataRecipent = {
        balance: addRecipient
    }

    await editBalance(dataSender, senderCustomer);
    await editBalance(dataRecipent, recipientCustomer);

    const data = {
        senderCustomer,
        transactionAmount,
        transferAmount,
        feesAmount,
        fees,
        recipientCustomer
    }
    fetch('http://localhost:3300/transfer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả từ server
            window.location.reload();
            alert("Transfer money sucessfully!")
        })
        .catch(error => {
            console.error('Error:', error);
        });

}



async function getById(customerID) {
    const response = await fetch("http://localhost:3300/customer/" + customerID);
    const customer = await response.json();
    return customer;
}
async function getBalanceById(customerID) {
    const customer = await getById(customerID);
    const balance = customer.balance;
    return balance;
}

async function editBalance(data, customerID) {
    await fetch("http://localhost:3300/customer/" + customerID, {
        method: 'PATCH',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    });
}

