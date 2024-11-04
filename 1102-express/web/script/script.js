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
              <td><input type="text" placeholder="Name" value="${
                item.name
              }" required /></td>
              <td><input type="number" placeholder="Quantity" value="${
                item.quantity
              }" required /></td>
              <td><label><input type="checkbox" id="itemPurchased" ${
                item.purchased ? "checked" : ""
              } /></label></td>
              <td><button type="button" onclick="confirmEdit(${id})">Confirm</button> <button type="button" onclick="${cancelEdit()}">Cancel</button></td> 
            </tr>
          </tbody>
        `);// cancel function 在edit按钮点击以后自动触发
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
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td class="actions">
                    <i class="fas fa-edit" onclick="editItem(${item.id})"></i>
                    <i class="fas fa-trash" onclick="deleteItem(${item.id})"></i>
                </td>
            </tr>`);
  });
}

// 页面加载时获取商品列表
$(document).ready(function () {
  loadItems();
  $("#itemForm").on("submit", addItem);
});
