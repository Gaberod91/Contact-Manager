loadContacts();
let addContactBtn = document.getElementById("add-contact");

addContactBtn.addEventListener("click", e => {
    addContact();
});

function addContact() {
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let phoneNumber = document.getElementById("phone-number").value;
    let email = document.getElementById("email").value;

    let tmp = {
        userId: userId,
        firstName: firstName,
        lastName: lastName,
        phone: phoneNumber,
        email: email
    };

    let jsonPayload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://contactsrus.xyz/LAMPAPI/AddContact.php", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log("Success!");
            }
            loadContacts();
        };
        xhr.send(jsonPayload);
    } catch (err) {
        //document.getElementById("loginResult").innerHTML = err.message;
    }
}

function loadContacts() {
    let tmp = { userId: userId };
    let jsonPayload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://contactsrus.xyz/LAMPAPI/LoadContacts.php", true);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let jsonObject = JSON.parse(xhr.responseText);

                for (let i = 0; i < Object.keys(jsonObject.results).length; i++) {
                    displayNewContact(jsonObject.results[i].firstName, jsonObject.results[i].lastName, jsonObject.results[i].phone, jsonObject.results[i].email);
                }
            }
        };
        xhr.send(jsonPayload);
    }
    catch (err) {
        //document.getElementById("colorSearchResult").innerHTML = err.message;
    }
}

function displayNewContact(firstName, lastName, phoneNumber, email) {
    let div = document.createElement("div");
    div.classList.add("col");
    let contactCards = document.getElementsByClassName("row")[0];
    div.innerHTML = `
        <div class="card text-bg-light mb-3 contact-card" data-bs-toggle="modal" data-bs-target="#updateContactBackdrop">
            <div class="card-header">${firstName} ${lastName}</div>
            <div class="card-body">
                <h5 class="card-title">Email: ${email} </h5>
                <h5 class="card-title">Phone Number: ${phoneNumber} </h5>
                <p class="card-text"></p>
            </div>
        </div>
    `
    contactCards.append(div);
}
