
document.getElementById("transferAmount").addEventListener("input", function () {
    var transferAmount = parseFloat(this.value);
    var feesValue = parseFloat(document.getElementById("fees").value);
    var totalAmount = transferAmount + (transferAmount * (feesValue / 100));
    var feesAmount = transferAmount * (feesValue / 100);
    document.getElementById("transactionAmount").setAttribute("value", totalAmount);
    document.getElementById("feesAmount").setAttribute("value", feesAmount);
});

function openTransfertModal(customerId) {
    const fullName = document.querySelector('#transferFullName');
    const email = document.querySelector('#transferEmail');
    const balance = document.querySelector('#transferBalance');
    const phone = document.querySelector('#transferPhone');
    const id = document.querySelector('#transferID');
    const fees = document.querySelector('#fees');

    fetch(`http://localhost:3300/customer/${customerId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // Đặt giá trị của các trường trong modal từ dữ liệu khách hàng
            fullName.value = data.fullName;
            email.value = data.email;
            balance.value = data.balance;
            phone.value = data.phone;
            fees.value = 10;
            id.value = data.id;
            // Hiển thị modal chuyển tiền
            getAllCustomers(customerId);
            const transferCustomerModal = new bootstrap.Modal(document.getElementById("transferCustomerModal"));
            transferCustomerModal.show();

            // Gọi hàm để lấy danh sách khách hàng cho phần chọn người nhận

        })
        .catch(error => {
            console.error('Error:', error);
        });
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
