const apiUrl = "http://localhost:8000/api/contacts";

function apiRequest(url, type, data, successCallback, errorCallback) {
  $.ajax({
    url: url,
    type: type,
    contentType: "application/json",
    data: JSON.stringify(data),
    success: successCallback,
    error: (xhr) => {
      const response = xhr.responseJSON;

      if (response && response.nullFields) {
        const nullFields = response.nullFields;
        alert(`The following fields cannot be Empty: ${nullFields.join(", ")}`);
      } else {
        console.error("An error occurred:", xhr);
      }
    },
  });
}

let cachedContact = null;
// Get contacts
const loadContacts = () => {
  $.get(apiUrl, (data) => {
    cachedContact = data;
    console.log(`Request success`);
    renderContacts(data);
  });
};

// Render contacts
function renderContacts(contacts) {
  const itemsContainer = $("#itemsContainer");
  itemsContainer.empty();
  const itemForm = $("#itemForm");
  itemForm.empty().append(`
        <input
          type="text"
          class="newInput"
          id="newItemName"
          placeholder="Name"
          required
        />
        <input
          class="newInput"
          type="text"
          id="newItemEmail"
          placeholder="Email"
          required
        />
        <input
          class="newInput"
          type="text"
          id="newItemPhone"
          placeholder="Phone"
          required
        />
        <button type="submit">Add contact</button>
      </form>
        `);
  contacts.forEach((contacts) => {
    itemsContainer.append(`
            <tr>
                <td>${contacts.name}</td>
                <td>${contacts.email}</td>
                <th>${contacts.phone}</th>
                <td class="actions" style="display: flex;  justify-content: center">
                    <div onclick="editContact(${contacts.id})">📝</div>
                    <div onclick="deleteContacts(${contacts.id})">🗑️</div>
                </td>
            </tr>
                `);
  });
}

// Delete Contact
function deleteContacts(id) {
  apiRequest(`${apiUrl}/${id}`, "DELETE", {}, loadContacts);
}

// Add contact
function addContact(event) {
  event.preventDefault();
  const name = $("#newItemName").val();
  const email = $("#newItemEmail").val();
  const phone = $("#newItemPhone").val();
  const regex =
    /^(?!.*[.-]{2})(?![.-])[A-Za-z0-9.-]+(?<![.-])@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!regex.test(email)) {
    $("#emailError").css("opacity", "100");
    return;
  }

  $("#itemForm input").val("");
  apiRequest(apiUrl, "POST", { name, email, phone }, loadContacts);
}

// Edit contact
function editContact(id) {
  $.get(apiUrl, (data) => {
    const contact = data.find((c) => c.id === id);
    if (!contact) {
      console.error("Contact not found");
      return;
    }

    const itemForm = $("#itemForm");
    itemForm.empty().append(`
      <div>
      <h3>Edit the Contact ${contact.name}</h3>
      </div>
      `);
    const titleLabel = $(".titleLabel");
    titleLabel.empty().append(`
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="itemsContainer">
              <tr>
                <td><input class="editName" type="text" placeholder="Name" value="${contact.name}" required /></td>
                <td><input class="editEmail" type="text" placeholder="Email" value="${contact.email}" required /></td>
                 <td><input class="editPhone" type="text" placeholder="Phone" value="${contact.phone}" required /></td>
                <td style="display: flex;  justify-content: space-evenly ">            
                  <div type="button" class="actionBtn" id="confirmEditButton">✔️</div>
                  <div type="button" class="actionBtn" id="cancelEditButton">🔙</div>
                </td> 
              </tr>
            </tbody>
          `);

    // 绑定事件到新渲染的按钮，使用 on 绑定而非直接调用
    $("#confirmEditButton")
      .off("click")
      .on("click", () => confirmEdit(id));
    $("#cancelEditButton")
      .off("click")
      .on("click", () => cancelEdit());
  });
}

function confirmEdit(id) {
  const editName = $(".editName").val();
  const editEmail = $(".editEmail").val();
  const editPhone = $(".editPhone").val();

  $.get(apiUrl, (data) => {
    const contact = data.find((c) => c.id === id);

    if (
      contact.name === editName &&
      contact.email === editEmail &&
      contact.phone === editPhone
    ) {
      renderContacts(cachedContact);
    } else {
      let updatedData = {};

      if (contact.name !== editName) updatedData.name = editName;
      if (contact.phone !== editPhone) updatedData.phone = editPhone;
      if (contact.email !== editEmail) updatedData.email = editEmail;

      if (updatedData.name && updatedData.email && updatedData.phone) {
        apiRequest(
          `${apiUrl}/${id}`,
          `PUT`,
          {
            name: editName,
            email: editEmail,
            phone: editPhone,
          },
          loadContacts
        );
      } else {
        apiRequest(`${apiUrl}/${id}`, `PATCH`, updatedData, loadContacts);
      }
    }
  });
}

// Cancel edit
function cancelEdit() {
  console.log("Cancel edit triggered");
  renderContacts(cachedContact);
}

$(document).ready(function () {
  loadContacts();
  $("#itemForm").on("submit", addContact);
});
