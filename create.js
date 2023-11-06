//gan su kien click cho nut create

const createCus = document.querySelector('#createButton');
createCus.addEventListener('click', function () {
    addCus();
});



function addCus() {
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
    fetch('http://localhost:3300/customer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Xử lý kết quả từ server
            closeCustomer();
            messageCreate("Create customer sucessfully!");
            window.location.reload();

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
function closeCustomer() {
    // Sử dụng Bootstrap để mở modal
    var modal = new bootstrap.Modal(document.getElementById("createCustomerModal"));
    modal.hide();
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