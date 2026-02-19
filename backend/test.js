const request = require("supertest");
const app = require("./src/index");

describe('GET LEARN DATA /api/learn',() => {
    it("should return data",async() => {
        const res = await request(app).get('/api/learn');

        expect(res.statusCode).toBe(200);
    })
})

describe('GET SKILLS /api/skill',() => {
    it("should return all skills",async() => {
        const res = await request(app).get('/api/skill')

        expect(res.statusCode).toBe(200);
    })
})

describe('GET SKILL BY USER /api/quizzes',() => {
    it("should return 500",async() => {
        const res = await request(app).post('/api/quizzes/skill')
            .send({})

        expect(res.statusCode).toBe(404);
    })
})
