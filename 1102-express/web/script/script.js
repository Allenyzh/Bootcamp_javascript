const apiUrl = "http://localhost:8000/api/items";

// 获取商品
function loadItems() {
  $.get(apiUrl, (data) => {
    renderItems(data);
  });
}

// 删除商品
function deleteItem(id) {
  $.ajax({
    url: `${apiUrl}/${id}`,
    type: "DELETE",
    success: () => {
      loadItems();
    },
  });
}

// 添加商品
function addItem(event) {
  event.preventDefault(); // submit事件默认刷新页面，导致console的数据消失，此方法阻止默认的表单提交行为
  const name = $("#newItemName").val();
  const quantity = parseInt($("#newItemQuantity").val(), 10);
  const purchased = $("#newItemPurchased").is(":checked");
  console.log(name, quantity, purchased);
  $("#itemForm input").val(""); 
  $.ajax({
    type: "POST",
    url: `${apiUrl}`,
    contentType: "application/json",
    data: JSON.stringify({ name, quantity, purchased }),
    success: (response) => {
      console.log(response);

      $.get(apiUrl, (data) => {
        renderItems(data);
      });
    },
    error: (error) => {
      console.error("Error adding item:", error);
    },
  });
}

// 编辑商品
function editItem(id) {
  $.get(apiUrl, (data) => {
    const item = data.find((item) => item.id === id);
    if (!item) {
      console.error("Item not found");
      return;
    }

    const titleLabel = $(".titleLabel");
    titleLabel.empty();
    titleLabel.append(`
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
              <td>            
                <button type="button" id="confirmEditButton">Confirm</button>
                <button type="button" id="cancelEditButton">Cancel</button>
              </td> 
            </tr>
          </tbody>
        `); // cancel function 在edit按钮点击以后自动触发

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
  const editQuantity = $(".editQuantity").val();
  const editPurchased = $(".editPurchased").is(":checked");
  console.log(editName, editQuantity, editPurchased);
  $.ajax({
    url: `${apiUrl}/${id}`,
    type: `PUT`,
    data: JSON.stringify({
      name: editName,
      quantity: editQuantity,
      purchased: editPurchased,
    }),
    contentType: "application/json",
    success: (res) => {
      console.log(`修改成功:`, res), cancelEdit();
    },
    error: (xhr, status, error) => {
      console.error("请求失败 - 状态码:", xhr.status); // 状态码，例如404、500等
      console.error("错误信息:", error); // 错误信息
      console.error("状态类型:", status); // 状态类型，例如 "timeout"、"error"
      console.error("响应内容:", xhr.responseText);
    },
  });
}

// cancel
function cancelEdit() {
  console.log("Cancel edit triggered");
  loadItems();
}

// 渲染商品列表
function renderItems(items) {
  const itemsContainer = $("#itemsContainer");
  itemsContainer.empty();
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
