//const http = require("http");
import http from "http"
import express from "express"
import cors from "cors"

const port = process.env.PORT || 8999;

const app = express();

var corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:8999', 'http://localhost:5000']
}

app.use(cors(corsOptions));
const server = http.createServer(app);

app.get("/api/", function (req, res) {
    const devices = [
        {
            id: '1frwe',
            model: 'Apple iPhone 12',
            brand: 'Apple',
            releaseYear: '2020',
            displaySize: 6.1,
            manufactureCountry: 'Китай',
            memory: 128,
            displayRefreshRate: 60,
            hasNFC: false,
            hasESIM: true,
            hasWirelessCharge: true,
            price: 81990,
            imgPath: 'Apple12.png',
        },
        {
            id: '45jwe',
            model: 'Xiaomi Mi 11 Lite',
            brand: 'Xiaomi',
            releaseYear: '2021',
            displaySize: 6.55,
            manufactureCountry: 'Китай',
            memory: 128,
            displayRefreshRate: 90,
            hasNFC: true,
            hasESIM: true,
            hasWirelessCharge: false,
            price: 27490,
            imgPath: 'Xiaomi11Lite.png',
        },
        {
            id: 'dfg45',
            model: 'Samsung Galaxy A72',
            brand: 'Samsung',
            releaseYear: '2021',
            displaySize: 6.7,
            manufactureCountry: 'Вьетнам',
            memory: 128,
            displayRefreshRate: 90,
            hasNFC: true,
            hasESIM: false,
            hasWirelessCharge: true,
            price: 32890,
            imgPath: 'SamsungA72.png',
        },
        {
            id: 'koiu8',
            model: 'Samsung Galaxy S21',
            brand: 'Samsung',
            releaseYear: '2021',
            displaySize: 6.2,
            manufactureCountry: 'Вьетнам',
            memory: 256,
            displayRefreshRate: 120,
            hasNFC: true,
            hasESIM: true,
            hasWirelessCharge: true,
            price: 79999,
            imgPath: 'SamsungS21.jpg',
        },
        {
            id: '41dgh',
            model: 'Apple iPhone Xr',
            brand: 'Apple',
            releaseYear: 2018,
            displaySize: 6.1,
            manufactureCountry: 'Китай',
            memory: 128,
            displayRefreshRate: 60,
            hasNFC: true,
            hasESIM: true,
            hasWirelessCharge: true,
            price: 81499,
            imgPath: 'AppleXr.jpg',
        },
        {
            id: 'ret67',
            model: 'Readmi 8 Pro',
            brand: 'Xiaomi',
            releaseYear: '2019',
            displaySize: 6.53,
            manufactureCountry: 'Китай',
            memory: 128,
            displayRefreshRate: 60,
            hasNFC: true,
            hasESIM: false,
            hasWirelessCharge: false,
            price: 18999,
            imgPath: 'Readmi8Pro.jpeg',
        }
    ]

    res.send(devices);
});

const start = () => {
    try {
        server.listen(port, () => console.log(`Server started on port ${port}`));
    } catch (e) {
        console.log(e);
    }
}

start();
