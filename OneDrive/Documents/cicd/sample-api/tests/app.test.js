const request = require("supertest");
const app = require("../src/app");

describe("Sample API Tests", () => {

    test("GET / should return welcome message", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Welcome to Sample API");
    });

    test("GET /health should return healthy status", async () => {
        const response = await request(app).get("/health");
        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("Healthy");
    });

});