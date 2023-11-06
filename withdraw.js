function openWithdrawtModal(customerId) {
    const fullName = document.querySelector('#withdrawfullName');
    const email = document.querySelector('#withdrawemail');
    const balance = document.querySelector('#withdrawBalance');
    const id = document.querySelector('#withdrawID');
    fetch(`http://localhost:3300/customer/${customerId}`, {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            // Đặt giá trị của các trường trong modal từ dữ liệu khách hàng
            fullName.value = data.fullName;
            email.value = data.email;
            id.value = data.id;
            balance.value = data.balance;

            const modal = new bootstrap.Modal(document.getElementById("withdrawCustomerModal"));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const myButtonWithdraw = document.querySelector('#withdrawButton');
myButtonWithdraw.addEventListener('click', function () {
    withdrawCustomer();
});

function withdrawCustomer() {
    const customer_id = parseFloat(document.querySelector('#withdrawID').value);
    const balanceOld = parseFloat(document.querySelector('#withdrawBalance').value);
    const withdrawAmount = parseFloat(document.querySelector('#withdrawAmount').value);
    if (isNaN(withdrawAmount) || withdrawAmount < 0 || withdrawAmount == 0) {
        alert("Withdraw's value invalid !");
        return;
    }
    const balance = balanceOld - withdrawAmount;
    if (isNaN(balance) || balance < 0) {
        alert("Withdraw's value invalid !");
        return;
    }
    const dataDepo = {
        customer_id,
        withdrawAmount
    };
    const data = {
        balance
    };
    fetch(`http://localhost:3300/withdraw`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataDepo)
    })
        .then(response => response.json())
        .then(dataDepo => {
            // Xử lý kết quả từ server
            // Gửi yêu cầu PATCH để cập nhật số dư của khách hàng
            fetch(`http://localhost:3300/customer/${customer_id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    // Xử lý kết quả từ server
                    window.location.reload(); // Tải lại trang để cập nhật số dư
                    alert("Withdraw successful!");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}