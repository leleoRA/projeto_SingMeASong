import "../../src/setup";
import supertest from "supertest";
import faker from "faker";

import app from "../../src/app";

import { insertVideo } from "../factories/recommFactory";
import { clearDatabase, closeConnection } from "../utils/database";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await closeConnection();
});

const agent = supertest(app);

describe("POST /recommendations", () => {
  it("should answer with status 201 when valid params", async () => {
    const body = {
      name: faker.name.title(),
      youtubeLink: "https://www.youtube.com/watch?v=EbvtGsrk-7c"
    }

    const res = await agent.post('/recommendations').send(body);

    expect(res.status).toEqual(201);
  });

  it("should answer with status 400 when body is invalid", async () => {
    const body = {}

    const res = await agent.post('/recommendations').send(body);

    expect(res.status).toEqual(400);
  });

  it("should answer with status 400 from invalid Youtube link", async () => {
    const body = {
      name: faker.name.title(),
      youtubeLink: "https://www.yyouttube.com/watch?v=EbvtGsrk-7c"
    }

    const res = await agent.post('/recommendations').send(body);

    expect(res.status).toEqual(400);
  });

});

describe("POST /recommendations/:id/upvote", () => {
  it("should answer with status 200 when valid ID", async () => {
    await insertVideo();

    const res = await agent.post('/recommendations/1/upvote');

    expect(res.status).toEqual(200);
  });

  it("should answer with status 404 if ID doesn't exist", async () => {
    const res = await agent.post('/recommendations/99999/upvote');

    expect(res.status).toEqual(404);
  });
})

describe("POST /recommendations/:id/downvote", () => {
  it("should answer with status 200 when valid ID", async () => {
    await insertVideo();

    const res = await agent.post('/recommendations/1/downvote');

    expect(res.status).toEqual(200);
  });

  it("should answer with status 404 if ID doesn't exist", async () => {
    const res = await agent.post('/recommendations/99999/downvote');

    expect(res.status).toEqual(404);
  });
})

describe("GET /recommendations/random", () => {
  it("should answer with status 200 when list is not empty", async () => {
    await insertVideo();
    
    const res = await agent.get('/recommendations/random');

    expect(res.status).toEqual(200);
  });

  it("should answer with status 404 when list is empty", async () => {
    const res = await agent.get('/recommendations/random');

    expect(res.status).toEqual(404);
  });
})

describe("GET /recommendations/top/:amount", () => {
  it("should answer with status 200 when valid params", async () => {
    await insertVideo();

    const res = await agent.get('/recommendations/top/1');

    expect(res.status).toEqual(200);
  });

  it("should answer with status 404 when list is empty", async () => {
    const res = await agent.get('/recommendations/top/2');

    expect(res.status).toEqual(404);
  });

  it("should answer with list ordered by score", async () => {
    await insertVideo();

    const res = await agent.get('/recommendations/top/1');

    expect(res.body[0].score).toEqual(200);
  });
})
