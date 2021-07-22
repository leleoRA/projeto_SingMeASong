import "../../src/setup";
import supertest from "supertest";
import faker from "faker";

import app from "../../src/app";
import connection from "../../src/database";

beforeEach(async () => {
  await connection.query('TRUNCATE items RESTART IDENTITY');
});

afterAll(async () => {
  await connection.end();
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

  it("should answer with status 400 from empty name", async () => {
    const body = {
      name: "",
      youtubeLink: "https://www.youtube.com/watch?v=EbvtGsrk-7c"
    }

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

