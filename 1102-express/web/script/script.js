const apiUrl = "http://localhost:8000/api/items";

function apiRequest(url, type, data, successCallback, errorCallback) {
  $.ajax({
    url: url,
    type: type,
    contentType: "application/json",
    data: JSON.stringify(data),
    success: successCallback,
    error:
      errorCallback || ((error) => console.error(`Error in ${type}:`, error)),
  });
}

let cachedItems = null;
// 获取商品
const loadItems = function () {
  $.get(apiUrl, function (data) {
    cachedItems = data;
    console.log(`请求成功`);
    renderItems(data);
  });
};

// 删除商品
function deleteItem(id) {
  apiRequest(`${apiUrl}/${id}`, "DELETE", {}, loadItems);
}

// 添加商品
function addItem(event) {
  event.preventDefault(); // submit事件默认刷新页面，导致console的数据消失，此方法阻止默认的表单提交行为
  const name = $("#newItemName").val();
  const quantity = parseInt($("#newItemQuantity").val(), 10);
  const purchased = $("#newItemPurchased").is(":checked");
  $("#itemForm input").val("");
  apiRequest(apiUrl, "POST", { name, quantity, purchased }, loadItems);
}

// 编辑商品
function editItem(id) {
  $.get(apiUrl, (data) => {
    const item = data.find((item) => item.id === id);
    if (!item) {
      console.error("Item not found");
      return;
    }

    const itemForm = $("#itemForm");
    itemForm.empty().append(`
      <div>
      <h3>Edit the Item</h3>
      </div>
      `);
    const titleLabel = $(".titleLabel");
    titleLabel.empty().append(`
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Purchased</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="itemsContainer">
            <tr>
              <td><input class="editName" type="text" placeholder="Name" value="${
                item.name
              }" required /></td>
              <td><input class="editQuantity" type="number" placeholder="Quantity" value="${
                item.quantity
              }" required /></td>
              <td><label><input class="editPurchased" type="checkbox" id="itemPurchased" ${
                item.purchased ? "checked" : ""
              } /></label></td>
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

// confirm edit
function confirmEdit(id) {
  const editName = $(".editName").val();
  const editQuantity = parseInt($(".editQuantity").val());
  const editPurchased = $(".editPurchased").is(":checked");

  $.get(apiUrl, (data) => {
    const item = data.find((item) => item.id === id);

    if (
      item.name === editName &&
      item.quantity === editQuantity &&
      item.purchased === editPurchased
    ) {
      renderItems(cachedItems);
    } else {
      let updatedData = {};

      if (item.name !== editName) updatedData.name = editName;
      if (item.quantity !== editQuantity) updatedData.quantity = editQuantity;
      if (item.purchased !== editPurchased)
        updatedData.purchased = editPurchased;

      if (
        updatedData.name &&
        updatedData.quantity &&
        typeof updatedData.purchased !== "undefined"
      ) {
        apiRequest(
          `${apiUrl}/${id}`,
          `PUT`,
          {
            name: editName,
            quantity: editQuantity,
            purchased: editPurchased,
          },
          loadItems
        );
      } else {
        apiRequest(`${apiUrl}/${id}`, `PATCH`, updatedData, loadItems);
      }
    }
  });
}

// cancel
function cancelEdit() {
  console.log("Cancel edit triggered");
  renderItems(cachedItems);
}

// 渲染商品列表
function renderItems(items) {
  const itemsContainer = $("#itemsContainer");
  itemsContainer.empty();
  const itemForm = $("#itemForm");
  itemForm.empty().append(
    `<input
          type="text"
          class="newInput"
          id="newItemName"
          placeholder="Name"
          required
        />
        <input
          class="newInput"
          type="number"
          id="newItemQuantity"
          placeholder="Quantity"
          required
        />
        <label>
          <input type="checkbox" id="newItemPurchased" /> purchased</label
        >
        <button type="submit">add items</button>
      </form>`
  );
  items.forEach((item) => {
    itemsContainer.append(`
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <th>${item.purchased ? "✔️" : "❌"}</th>
                <td class="actions" style="display: flex;  justify-content: center">
                    <div onclick="editItem(${item.id})">📝</div>
                    <div onclick="deleteItem(${item.id})">🗑️</div>
                </td>
            </tr>`);
  });
}

// 页面加载时获取商品列表
$(document).ready(function () {
  loadItems();
  $("#itemForm").on("submit", addItem);
});
