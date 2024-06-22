const domain = "http://192.168.1.14:1234"

// Lấy danh sách các mục trong danh sách
var accountList = document.getElementById('accountList');
var page = 1;

document.addEventListener("DOMContentLoaded", () => {
    loadPage();
});


function loadPage(){
    const ul = document.getElementById("accountList");
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    // Gọi API để lấy dữ liệu
    fetch(domain + "/user/query?page=1")
        .then(response => response.json())
        .then(data => {
            data.Data.forEach(item => {
                const li = document.createElement("li");

                // Đặt các thuộc tính cho thẻ li
                li.setAttribute("data-account", item.username);
                li.setAttribute("data-username", item.password);
                li.setAttribute("uid", item.id);

                if ( item.delete_expired != "") {
                    li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024  <i style="color: orange" class="fa-solid fa-eraser"></i>`;
                }else{
                    li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024`;
                }

                // Thêm thẻ li vào ul
                ul.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching data:", error));

    viewDashboard()
}

// Thêm sự kiện click cho mỗi mục
accountList.addEventListener('click', function(event) {
    var listItem = event.target.closest('li');
    if (!listItem) return;

    // Lấy thông tin tài khoản và tên người dùng từ các thuộc tính data
    var account = listItem.getAttribute('data-account');
    var username = listItem.getAttribute('data-username');
    var uid = listItem.getAttribute('uid');

    // Hiển thị modal chi tiết với thông tin tương ứng
    document.getElementById('accountName').innerText = account;
    document.getElementById('username').innerText = username;
    document.getElementById('detailModal').style.display = 'block';
    document.getElementById('detailModal').setAttribute("uid", uid);
    document.getElementById('detailModal').setAttribute("data-account", account);
    document.getElementById('detailModal').setAttribute("data-username", username);
    document.getElementById('containerList').classList.add('blur');
});

// Đóng modal khi người dùng nhấp vào nút đóng
document.getElementsByClassName('close')[0].addEventListener('click', function() {
    document.getElementById('detailModal').style.display = 'none';

    document.getElementById('containerList').classList.remove('blur');
});

function redirectToLoginPage() {
    window.location.href = "authen.html";
}

function search(){
    var inputElement = document.getElementById("search");
    var inputValue = inputElement.value;

    fetch(domain + "/admin/search?data=" + inputValue)
    .then(response => response.json())
    .then(data => {
        var ul = document.getElementById("accountList");
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        data.Data.forEach(item => {
            const li = document.createElement("li");

            // Đặt các thuộc tính cho thẻ li
            li.setAttribute("data-account", item.username);
            li.setAttribute("data-username", item.password);
            li.setAttribute("uid", item.id);

            // Đặt nội dung cho thẻ li
            if ( item.delete_expired != "") {
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024  <i style="color: orange" class="fa-solid fa-eraser"></i>`;
            }else{
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024`;
            }

            // Thêm thẻ li vào ul
            ul.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching data:", error));
}

function viewDashboard(){
    document.getElementById("containerList").style.display = "block";
    document.getElementById("containerAccount").style.display = "none";
}

function viewCreateAcc(){
    document.getElementById("containerList").style.display = "none";
    document.getElementById("containerAccount").style.display = "block";
}

function nextPage(){
    const ul = document.getElementById("accountList");
    page = page + 1;
    fetch(domain + "/user/query?page=" + page)
    .then(response => response.json())
    .then(data => {
        const pre = document.getElementById('prev');
        if (pre.hasAttribute('disabled')) {
            pre.removeAttribute('disabled');
        }
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        data.Data.forEach(item => {
            const li = document.createElement("li");

            // Đặt các thuộc tính cho thẻ li
            li.setAttribute("data-account", item.username);
            li.setAttribute("data-username", item.password);
            li.setAttribute("uid", item.id);

            if ( item.delete_expired != "") {
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024  <i style="color: orange" class="fa-solid fa-eraser"></i>`;
            }else{
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024`;
            }

            // Thêm thẻ li vào ul
            ul.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching data:", error));

    var fPage = page + 1;
    fetch(domain + "/user/query?page=" + fPage)
    .then(response => response.json())
    .then(data => {
        console.log(data.Data)
        if (data.Data == null) {
            const nextBtn = document.getElementById('next');
            if (!nextBtn.hasAttribute('disabled')) {
                nextBtn.setAttribute('disabled', 'disabled');
            }
        }
    })
    .catch(error => console.error("Error fetching data:", error));
}

function prevPage(){
    const ul = document.getElementById("accountList");
    page = page -1;
    fetch(domain + "/user/query?page=" + page)
    .then(response => response.json())
    .then(data => {
        const next = document.getElementById('next');
        if (next.hasAttribute('disabled')) {
            next.removeAttribute('disabled');
        }
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        data.Data.forEach(item => {
            const li = document.createElement("li");

            // Đặt các thuộc tính cho thẻ li
            li.setAttribute("data-account", item.username);
            li.setAttribute("data-username", item.password);
            li.setAttribute("uid", item.id);

            if ( item.delete_expired != "") {
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024  <i style="color: orange" class="fa-solid fa-eraser"></i>`;
            }else{
                li.innerHTML = `<strong>Tên người dùng:</strong> ${item.username} | <strong>Đăng nhập gần nhất:</strong> 16/06/2024`;
            }

            // Thêm thẻ li vào ul
            ul.appendChild(li);
        });
    })
    .catch(error => console.error("Error fetching data:", error));

    if (page <= 1){
        const pre = document.getElementById('prev');
        pre.setAttribute('disabled', 'disabled');
    }
}

function deleteAccount(){
    var detail  =  document.getElementById('detailModal');
    const username = detail.getAttribute('data-account');
    const password = detail.getAttribute('data-username');
    const uid = detail.getAttribute("uid");

    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();

    let formattedDate = `${day}/${month}/${year}`;

    var body = {
        "username": username,
        "password": password,
        "id": uid,
        "delete_expired": "true",
        "last_active": formattedDate
    }

    fetch(domain + '/admin/user', { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        alert('Cập nhật thành công!');
        loadPage();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Cập nhật thất bại Vui lòng thử lại.');
    });
}

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy dữ liệu từ form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;

    let valid = true;

    if (username.length < 3) {
        alert("Tên người dùng phải có ít nhất 3 ký tự.");
        valid = false;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự.");
        valid = false;
    }

    if (valid) {
        const data = {
            username: username,
            password: password,
        };

        fetch(domain + '/user/register', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            alert('Đăng ký thành công!');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Đăng ký thất bại. Vui lòng thử lại.');
        });
    }
});