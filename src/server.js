require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import userRouter from "./api/nhan_vien/user.router";
import LoaiGiayRouter from "./api/loai_san_pham/loaigiay.router";
import UploadRouter from "./api/uploadImage/upload.router";
import giayRouter from "./api/san_pham/sanpham.router";
import mauSacRouter from "./api/mau_sac/sanpham.router";
import ctmauSacRouter from "./api/chi_tiet_mau_sac/sanpham.router";
import ctsizeRouter from "./api/size/sanpham.router";
import ctsizeMauSacRouter from "./api/chi_tiet_size/sanpham.router";
import khuyenMai from "./api/khuyen_mai/loaigiay.router";
import ctKhuyenMai from "./api/chi_tiet_khuyen_mai/sanpham.router";
import ctDonhang from "./api/chi_tiet_don_hang/loaigiay.router";
import khachhang from "./api/khach_hang/loaigiay.router";
import dathang from "./api/dat_hang/loaigiay.router";
import thongke from "./api/thong_ke/loaigiay.router";
import quangcao from "./api/quangcao/user.router";
import tinh_thanh_pho from './api/tinh_thanh_pho/user.router';
import tin_tuc from './api/tintuc/user.router';
import chi_tiet_danh_gia from './api/danh_gia/user.router';
const initRoutes = require('./api/xac_nhan_mail/router')


const router = express.Router()
// const webSocketServer = require("websocket").server;
import { WebSocketServer } from 'ws';
const http = require("http");
var cors = require("cors");
let app = express();
const clients = {};

app.use(express.json());
app.use(bodyParser.json({
    limit: '500mb'
  }));
  
  app.use(bodyParser.urlencoded({
    limit: '500mb',
    parameterLimit: 100000,
    extended: true 
  }));
global.__basedir = __dirname;
const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
//config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

// //init cron job
// initCronJob();
//init all web routes
initWebRoutes(app);
initRoutes(app)
app.use("/api/users", userRouter);
app.use("/api/giay", giayRouter);
app.use("/api/mau_sac", mauSacRouter);
app.use("/api/chi_tiet_mau_sac", ctmauSacRouter);
app.use("/api/size", ctsizeRouter);
app.use("/api/chi_tiet_size", ctsizeMauSacRouter);
app.use("/api/loai_giay", LoaiGiayRouter);
app.use("/api/khuyen_mai", khuyenMai);
app.use("/api/chi_tiet_khuyen_mai", ctKhuyenMai);
app.use("/api/chi_tiet_don_hang", ctDonhang);
app.use("/api/khach_hang", khachhang);
app.use("/api/dat_hang", dathang);
app.use("/api/thong_ke", thongke);
app.use("/api/tinh_thanh_pho", tinh_thanh_pho);
app.use("/api/quang_cao", quangcao);
app.use("/api/tin_tuc", tin_tuc);
app.use("/api/chi_tiet_danh_gia", chi_tiet_danh_gia);

// app.post('/momo', function (req, res, next) {
//     var partnerCode = "MOMO";
//     var accessKey = "F8BBA842ECF85";
//     var secretkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
//     var requestId = partnerCode + new Date().getTime();
//     var orderId = requestId;
//     var orderInfo = "pay with MoMo";
//     var redirectUrl = "https://momo.vn/return";
//     var ipnUrl = "https://callback.url/notify";
//     // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
//     var amount = "50000";
//     var requestType = "captureWallet"
//     var extraData = ""; //pass empty value if your merchant does not have stores
    
//     //before sign HMAC SHA256 with format
//     //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
//     var rawSignature = "accessKey="+accessKey+"&amount=" + amount+"&extraData=" + extraData+"&ipnUrl=" + ipnUrl+"&orderId=" + orderId+"&orderInfo=" + orderInfo+"&partnerCode=" + partnerCode +"&redirectUrl=" + redirectUrl+"&requestId=" + requestId+"&requestType=" + requestType
//     //puts raw signature
//     console.log("--------------------RAW SIGNATURE----------------")
//     console.log(rawSignature)
//     //signature
//     const crypto = require('crypto');
//     var signature = crypto.createHmac('sha256', secretkey)
//         .update(rawSignature)
//         .digest('hex');
//     console.log("--------------------SIGNATURE----------------")
//     console.log(signature)
    
//     //json object send to MoMo endpoint
//     const requestBody = JSON.stringify({
//         partnerCode : partnerCode,
//         accessKey : accessKey,
//         requestId : requestId,
//         amount : amount,
//         orderId : orderId,
//         orderInfo : orderInfo,
//         redirectUrl : redirectUrl,
//         ipnUrl : ipnUrl,
//         extraData : extraData,
//         requestType : requestType,
//         signature : signature,
//         lang: 'en'
//     });
//     //Create the HTTPS objects
//     const https = require('https');
//     const options = {
//         hostname: 'test-payment.momo.vn',
//         port: 443,
//         path: '/v2/gateway/api/create',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Content-Length': Buffer.byteLength(requestBody)
//         }
//     }
//     //Send the request and get the response
//     const req = https.request(options, res => {
//         console.log(`Status: ${res.statusCode}`);
//         console.log(`Headers: ${JSON.stringify(res.headers)}`);
//         res.setEncoding('utf8');
//         res.on('data', (body) => {
//             console.log('Body: ');
//             console.log(body);
//             console.log('payUrl: ');
//             console.log(JSON.parse(body).payUrl);
//         });
//         res.on('end', () => {
//             console.log('No more data in response.');
//         });
//     })
    
//     req.on('error', (e) => {
//         console.log(`problem with request: ${e.message}`);
//     });
//     // write data to request body
//     console.log("Sending....")
//     req.write(requestBody);
//     req.end();
// });




app.post("/api/notify", async(req, res) => {
    const data = req.body;
    // clients["nhat"].sendUTF(
    //     JSON.stringify({
    //         type: "messages",
    //         msg: data,
    //     })
    // );
});

const server = http.createServer(app);

const wsServer = new WebSocketServer({
    port: 8081,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
    }
  });

const getUniqueID = () => {
    const s4 = () =>
        Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return s4() + s4() + "-" + s4();
};

wsServer.on("request", function(request) {
    var userID = getUniqueID();
    const connection = request.accept(null, request.origin);
    clients["nhat"] = connection;
});

UploadRouter(app);
let port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log("Ket noi 8080");
});