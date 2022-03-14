import supertest from "supertest";
import request from "supertest";
import cookie from "cookie";

import { createApp } from "./api";

describe("/api", () => {
  it("should run http server", async () => {
    const app = createApp();
    const response = await request(app).get("/");

    expect(response.status).toBe(404);
  });

  describe("/signin", () => {
    it("should return bad request with empty body", async () => {
      const app = createApp();
      const response = await request(app).post("/api/signin");

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        message: "Bad Request!",
      });
    });

    it("should return 403 with wrong email", async () => {
      const app = createApp();

      const response = await request(app)
        .post("/api/signin")
        .send({ email: "admin", password: "hello" });

      expect(response.headers["set-cookie"]).toBeFalsy();
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "Login or password is incorrect!",
      });
    });

    it("should return 403 with wrong password", async () => {
      const app = createApp();

      const response = await request(app)
        .post("/api/signin")
        .send({ email: "admin@example.com", password: "aaaa" });

      expect(response.headers["set-cookie"]).toBeFalsy();
      expect(response.status).toBe(403);
      expect(response.body).toEqual({
        message: "Login or password is incorrect!",
      });
    });

    it("should return 200 and set cookie with right credentials", async () => {
      const app = createApp();

      const response = await request(app)
        .post("/api/signin")
        .send({ email: "admin@example.com", password: "hello" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "OK" });
      expect(response.headers["set-cookie"][0]).toContain("feather-cookie");
      expect(response.headers["set-cookie"][0]).toContain("HttpOnly");
      expect(response.headers["set-cookie"][0]).toContain("Strict");
    });
  });

  describe("/check-auth", () => {
    it("should return 403 without cookie", async () => {
      const app = createApp();
      const agent = supertest.agent(app);

      const singinResponse = await agent
        .post("/api/signin")
        .send({ email: "admin", password: "hello" });
      expect(singinResponse.status).toBe(403);

      const checkResponse = await agent.get("/api/check-auth");
      expect(checkResponse.status).toBe(403);
      expect(checkResponse.body).toEqual({ message: "Unauthorized!" });
    });

    it("should return 200 with cookie", async () => {
      const app = createApp();
      const agent = supertest.agent(app);

      const singinResponse = await agent
        .post("/api/signin")
        .send({ email: "admin@example.com", password: "hello" });
      expect(singinResponse.status).toBe(200);

      const checkResponse = await agent.get("/api/check-auth");
      expect(checkResponse.status).toBe(200);
      expect(checkResponse.body).toBeFalsy();
    });
  });

  describe("/signout", () => {
    it("should clear cookie", async () => {
      const app = createApp();
      const agent = supertest.agent(app);

      const singinResponse = await agent
        .post("/api/signin")
        .send({ email: "admin@example.com", password: "hello" });
      expect(singinResponse.status).toBe(200);

      const signoutResponse = await agent.post("/api/signout");
      expect(signoutResponse.status).toBe(200);
      expect(signoutResponse.body).toBeFalsy();
      expect(
        cookie.parse(signoutResponse.headers["set-cookie"][0])["feather-cookie"]
      ).toEqual("");
    });
  });

  describe("/any-path", () => {
    it("should not be accessed without signed cookie", async () => {
      const app = createApp();

      const singinResponse = await request(app)
        .get("/api/graphql")
        .set("Cookie", ["feather-cookie=user"]);
      expect(singinResponse.status).toBe(403);
    });
  });
});
