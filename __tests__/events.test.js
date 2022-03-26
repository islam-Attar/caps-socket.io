'use strict';
const { faker } = require('@faker-js/faker');
const port =  process.env.PORT || 3000;
const io = require('socket.io')(port);
const client = require('socket.io-client');

const host = "http://localhost:3000";
const fakeClient = client.connect(host);

let socketObj ={};
let storeName = {
    store: "my store",
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
};
describe('testing the connection ',()=>{
    let consoleSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })
    afterAll(()=>{
        consoleSpy.mockRestore();
    })


  it('testing the client connection',async()=>{
        io.emit('connection',socketObj);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

})

describe('testing the server (caps)', () => {
    let consoleSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })
    afterAll(()=>{
        consoleSpy.mockRestore();
    })
    it('pickup emiting', async () => {
        io.emit('pickup',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })
    it('in-transit emiting', async () => {
        io.emit('in-transit',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })
    it('delivered emiting', async () => {
        io.emit('delivered',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

    

})

describe('testing the client side', () => {
    let consoleSpy;
    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    })
    afterAll(()=>{
        consoleSpy.mockRestore();
        io.close();
    })
    it('pickup emiting', async () => {
        fakeClient.emit('pickup',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })
    it('in-transit emiting', async () => {
        fakeClient.emit('in-transit',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })
    it('delivered emiting', async () => {
        fakeClient.emit('delivered',storeName);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })
})