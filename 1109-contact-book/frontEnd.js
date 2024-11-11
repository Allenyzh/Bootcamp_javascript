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

// a c e  对应邮箱 用户名 电话的输入框元素id, b d f 对应邮箱 用户名 电话的错误信息元素id
function checkInputError(id, inputId, isValid) {
  if (!isValid) {
    $(id).css("opacity", "100");
    $(inputId).css("border", "1px solid red");
    return true;
  } else {
    $(id).css("opacity", "0");
    $(inputId).css("border", "");
    return false;
  }
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
                <td class="actions" style="display: flex;  justify-content: center; border-bottom: none; border-left: none; border-right: none">
                    <div onclick="editContact(${contacts.id})">📝</div>
                    <div onclick="deleteContacts(${contacts.id})">🗑️</div>
                </td>
            </tr>
                `);
  });
}

// Delete Contact
function deleteContacts(id) {
  $("#nameError").css("opacity", "0");
  $("#emailError").css("opacity", "0");
  $("#phoneError").css("opacity", "0");
  apiRequest(`${apiUrl}/${id}`, "DELETE", {}, loadContacts);
}

// Add contact
function addContact(event) {
  event.preventDefault();
  const name = $("#newItemName").val();
  const email = $("#newItemEmail").val();
  const phone = $("#newItemPhone").val();

  // 分别验证每一个输入项
  const emailHasError = checkInputError(
    "#emailError",
    "#newItemEmail",
    /^(?!.*[.-]{2})(?![.-])[A-Za-z0-9.-]+(?<![.-])@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      email
    )
  );

  const nameHasError = checkInputError(
    "#nameError",
    "#newItemName",
    /^.{0,40}$/.test(name)
  );

  const phoneHasError = checkInputError(
    "#phoneError",
    "#newItemPhone",
    /^\d{3}-?\d{3}-?\d{4}$/.test(phone)
  );

  // 如果任何一个输入项有错误，则返回
  if (emailHasError || nameHasError || phoneHasError) return;

  // 清除输入框的值并发送请求
  $("#itemForm input").val("");
  apiRequest(apiUrl, "POST", { name, email, phone }, loadContacts);
}

// Edit contact
function editContact(id) {
  $("#nameError").css("opacity", "0");
  $("#emailError").css("opacity", "0");
  $("#phoneError").css("opacity", "0");
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
                <th style="border-bottom: none;">Actions</th>
              </tr>
            </thead>
            <tbody id="itemsContainer">
              <tr style="border-top: 0.5px solid #ddd; border-bottom: none; border-left: none; border-right: none">
                <td>
                  <div style="display: block; border: none">
                    <input class="editName" id="editName" type="text" placeholder="Name" value="${contact.name}" required />
                    <!-- 错误信息 -->
                    <div id="nameError-e" style="color: red;">名字太长&#xFF0C;<=40个字符<div>
                  </div>
                </td>
                <td>
                  <div style="display: block; border: none">
                    <input class="editEmail" id="editEmail" type="text" placeholder="Email" value="${contact.email}" required />
                    <!-- 错误信息 -->
                    <div id="emailError-e" style="color: red;">邮箱格式不正确<div>
                  </div>
                </td>
                <td>
                  <div style="display: block; border: none">
                    <input class="editPhone" id="editPhone" type="text" placeholder="Phone" value="${contact.phone}" required />
                    <!-- 错误信息 -->
                    <div id="phoneError-e" style="color: red;">电话长度应该为10位数<div>
                  </div>
                </td>
                <td style="display: flex;  justify-content: space-evenly; border: none">            
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
  const name = $(".editName").val();
  const email = $(".editEmail").val();
  const phone = $(".editPhone").val();

  // 分别验证每一个输入项
  const emailHasError = checkInputError(
    "#emailError-e",
    "#editEmail",
    /^(?!.*[.-]{2})(?![.-])[A-Za-z0-9.-]+(?<![.-])@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
      email
    )
  );

  const nameHasError = checkInputError(
    "#nameError-e",
    "#editName",
    /^.{0,40}$/.test(name)
  );

  const phoneHasError = checkInputError(
    "#phoneError-e",
    "#editPhone",
    /^\d{3}-?\d{3}-?\d{4}$/.test(phone)
  );

  // 如果任何一个输入项有错误，则返回
  if (emailHasError || nameHasError || phoneHasError) return;

  $.get(apiUrl, (data) => {
    const contact = data.find((c) => c.id === id);

    if (
      contact.name === name &&
      contact.email === email &&
      contact.phone === phone
    ) {
      renderContacts(cachedContact);
    } else {
      let updatedData = {};

      if (contact.name !== name) updatedData.name = name;
      if (contact.phone !== phone) updatedData.phone = phone;
      if (contact.email !== email) updatedData.email = email;

      if (updatedData.name && updatedData.email && updatedData.phone) {
        apiRequest(
          `${apiUrl}/${id}`,
          `PUT`,
          {
            name: name,
            email: email,
            phone: phone,
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
  $("#nameError").css("opacity", "0");
  $("#emailError").css("opacity", "0");
  $("#phoneError").css("opacity", "0");
  console.log("Cancel edit triggered");
  renderContacts(cachedContact);
}

$(document).ready(function () {
  loadContacts();
  $("#itemForm").on("submit", addContact);
});
