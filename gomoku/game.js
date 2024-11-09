$(document).ready(() => {
  const chessboard = $("#chessboard");
  let currentPlayer = "X";

  for (let i = 0; i < 400; i++) {
    $('<div class="cell"></div>').appendTo(chessboard);
  }

  $(".cell").on("click", function () {
    // 检查格子是否已被占用
    if ($(this).text() === "") {
      $(this).text(currentPlayer); // 显示当前玩家的标记
      // 切换玩家
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  });
});

// const str = "12\u200B3";
// console.log(str.length);
// console.log(str);
