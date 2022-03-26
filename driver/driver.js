'use strict';
const socket = require('socket.io-client')
const host = "http://localhost:4444"

const capsConnection = socket.connect(host)

capsConnection.on('pickup',(storeName)=>{

    console.log(`DRIVER : picked up ${storeName.orderID} `);
    setTimeout(() => {
        (capsConnection.emit('in-transit', storeName));
        console.log('DRIVER : in-transit')
    },2000)
    setTimeout(() => {
        (capsConnection.emit('delivered', storeName));
        console.log(`DRIVER : delivered up ${storeName.orderID}`)
    },3000)
    
})