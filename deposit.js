//click vao nut
function openDepositModal(customerId) {
    const fullName = document.querySelector('#depositfullName');
    const email = document.querySelector('#depositemail');
    const balance = document.querySelector('#depositBalance');
    const id = document.querySelector('#depositID');
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

            const modal = new bootstrap.Modal(document.getElementById("depositCustomerModal"));
            modal.show();
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
const myButtonDeposit = document.querySelector('#depositButton');
myButtonDeposit.addEventListener('click', function () {
    depositCustomer();
});


function depositCustomer() {
    const customer_id = parseFloat(document.querySelector('#depositID').value);
    const balanceOld = parseFloat(document.querySelector('#depositBalance').value);
    const depositAmount = parseFloat(document.querySelector('#depositAmount').value);
    if (isNaN(depositAmount) || depositAmount < 0 || depositAmount == 0) {
        alert("Deposit's value invalid !");
        return;
    }
    const balance = balanceOld + depositAmount;
    const dataDepo = {
        customer_id,
        depositAmount
    };
    const data = {
        balance
    };
    fetch(`http://localhost:3300/deposit`, {
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
                    alert("Deposit successful!");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
