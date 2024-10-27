const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
let orders = [];

app.use(bodyParser.json());
app.use(express.static('public'));

// 处理订单提交
app.post('/submit-order', (req, res) => {
    const { customerName, dish } = req.body;
    if (customerName && dish) {
        orders.push({ customerName, dish });
        res.json({ message: '订单提交成功！' });
    } else {
        res.status(400).json({ message: '订单信息不完整！' });
    }
});

// 商家查看订单列表
app.get('/orders', (req, res) => {
    res.json(orders);
});

app.listen(PORT, () => {
    console.log(`服务器在端口 ${PORT} 启动`);
});