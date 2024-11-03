const apiUrl = "http://localhost:8000/api/items";

function loadItems() {
  $.get(apiUrl, function (data) {
    renderItems(data);
  });
}

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
            </tr>
        `);
  });
}

$(document).ready(function () {
  loadItems();
});
