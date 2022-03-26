'use strict';

const socket = require('socket.io-client')
const host = "http://localhost:4444"
const {faker}= require('@faker-js/faker');

const io = socket.connect(host)


setInterval(() => {
         let storeName = {
        store: "PC's Store",
        orderID: faker.datatype.uuid(),
        customer: faker.name.findName(),
        address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };
    io.emit('pickup',storeName)
}, 5000);

io.on('delivered',(storeName)=>{
    console.log(`VENDOR : Thank you for delivering ${storeName.orderID}`);
})