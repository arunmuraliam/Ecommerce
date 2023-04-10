import chai from "chai";
import mocha from "mocha"
import chaiHttp from "chai-http"
import app from "../app.js";
import path from "path"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import fs from "fs"
//const expect = chai.expect;

//Assertion style 
chai.should();

chai.use(chaiHttp);

describe('Product API', () => {
    /**
     * Test the GET all route
     */
    describe("GET /api/seller/get-all-products", () => {
        it("It should GET all the products", (done) => {
            chai.request(app)
                .get("/api/seller/get-all-products")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                })

        })

        it("It should NOT GET all the products for wrong URI", (done) => {
            chai.request(app)
                .get("/api/seller/get-all-produc")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                })
        })
    })

    /**
     * Test the POST route
     */

    // describe("POST /api/seller/create-user", () => {
    //     let user = {
    //         name: "arun",
    //         email: "arun@gmail.com",

    //     }
    //     it("It should add new product", (done) => {
    //         chai.request(app)
    //             .post('/api/seller/create-user')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(201);
    //                 res.body.should.be.a('object');
    //                 done();
    //             });

    //     });
    // });

    describe('POST add product /api/seller/add-product/', () => {
        it('should upload multiple images with data', (done) => {
            const filePath = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath2 = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath3 = path.join(__dirname, '../public/media/1679470094662542224.jpg.jpg');
            let sellerId = "6418a27ab05224f56b175e2a";
            const formData = {
                name: "Iphone 16",
                features: "50 mp camera",
                description: "new look 16",
                price: 60000,
            };

            chai.request(app)
                .post('/api/seller/add-product/' + sellerId)
                .field('name', formData.name)
                .field('features', formData.features)
                .field('description', formData.description)
                .field('price', formData.price)
                .attach('image', fs.readFileSync(filePath), 'testImage1.jpg')
                .attach('resources', fs.readFileSync(filePath2), 'testImage2.jpg')
                .attach('resources', fs.readFileSync(filePath3), 'testImage2.jpg')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message', 'Product added successfully');
                    res.body.should.have.property('product');
                    done();
                });
        });

        it('should not upload data without required elements ', (done) => {
            const filePath = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath2 = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath3 = path.join(__dirname, '../public/media/1679470094662542224.jpg.jpg');
            let sellerId = "6418a27ab05224f56b175e2a";
            const formData = {
                name: "Iphone 16",
                features: "50 mp camera",
                description: "new look 16",
                price: 60000,
            };

            chai.request(app)
                .post('/api/seller/add-product/' + sellerId)
                //.field('name', formData.name)
                //.field('features', formData.features)
                //.field('description', formData.description)
                //.field('price', formData.price)
                .attach('image', fs.readFileSync(filePath), 'testImage1.jpg')
                .attach('resources', fs.readFileSync(filePath2), 'testImage2.jpg')
                .attach('resources', fs.readFileSync(filePath3), 'testImage2.jpg')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    done();
                });
        });

        it('should not upload data for wrong URI ', (done) => {
            const filePath = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath2 = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath3 = path.join(__dirname, '../public/media/1679470094662542224.jpg.jpg');
            let sellerId = "6418a27ab05224f56b175e2a";
            const formData = {
                name: "Iphone 16",
                features: "50 mp camera",
                description: "new look 16",
                price: 60000,
            };

            chai.request(app)
                .post('/api/seller/add-produ/' + sellerId)
                .field('name', formData.name)
                .field('features', formData.features)
                .field('description', formData.description)
                .field('price', formData.price)
                .attach('image', fs.readFileSync(filePath), 'testImage1.jpg')
                .attach('resources', fs.readFileSync(filePath2), 'testImage2.jpg')
                .attach('resources', fs.readFileSync(filePath3), 'testImage2.jpg')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /**
     * Test the PUT route
     */

    describe('PUT update product /api/seller/update-product/', () => {
        it('should update multiple images with data', (done) => {
            const filePath = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath2 = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath3 = path.join(__dirname, '../public/media/1679470094662542224.jpg.jpg');
            let pid = "641aae7a954648853f9ec347";
            const formData = {
                name: "Iphone 13",
                features: "30 mp camera",
                description: "new look 13",
                price: 30000,
            };

            chai.request(app)
                .put('/api/seller/update-product/' + pid)
                .field('name', formData.name)
                .field('features', formData.features)
                .field('description', formData.description)
                .field('price', formData.price)
                .attach('image', fs.readFileSync(filePath), 'testImage1.jpg')
                .attach('resources', fs.readFileSync(filePath2), 'testImage2.jpg')
                .attach('resources', fs.readFileSync(filePath3), 'testImage2.jpg')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message', 'Product updated successfully');
                    res.body.should.have.property('updatedProduct');
                done();
                });
        });

        it('should not update multiple images with data for invalid product id', (done) => {
            const filePath = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath2 = path.join(__dirname, '../public/media/1679469734888road_marking_cloudy_124093_1366x768.jpg.jpg');
            const filePath3 = path.join(__dirname, '../public/media/1679470094662542224.jpg.jpg');
            let pid = "641aae7a954648853f9ecdf7";
            const formData = {
                name: "Iphone 13",
                features: "30 mp camera",
                description: "new look 13",
                price: 30000,
            };

            chai.request(app)
                .put('/api/seller/update-product/' + pid)
                .field('name', formData.name)
                .field('features', formData.features)
                .field('description', formData.description)
                .field('price', formData.price)
                .attach('image', fs.readFileSync(filePath), 'testImage1.jpg')
                .attach('resources', fs.readFileSync(filePath2), 'testImage2.jpg')
                .attach('resources', fs.readFileSync(filePath3), 'testImage2.jpg')
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message', 'No record exist');
                done();
                });
        });
    });

    /**
     * Test the DELETE route
     */

    describe('Delete/ delete product /api/seller/update-product/', () => {
        it('should delete data', (done) => {
            let pid = "6420777ec4739788d26d8666";
            chai.request(app)
                .delete('/api/seller/delete-product/' + pid)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message', 'Product deleted successfully');
                done();
                });
        });

        it('should not delete data for invalid product id', (done) => {
            let pid = "642076ab3f497c91de8f354c";
            chai.request(app)
                .delete('/api/seller/delete-product/' + pid)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message', 'Product not found!!');
                done();
                });
        });
    });

});



