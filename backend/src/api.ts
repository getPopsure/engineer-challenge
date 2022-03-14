import express, { Router, json } from "express";
import cookieParser from "cookie-parser";
import { scryptSync, timingSafeEqual } from "crypto";

// this should be stored in real database but I don't have one
const admins = [
  {
    email: "admin@example.com",
    password:
      "cVOTE1w2HOSD8qqG/n5LNQ==:gn88MyG2iB6QWsokzEOm8lWjbn93CY0SarOK5NqDWv8QCZjlarTetB2GxOT71Ztt9ixBvRIHjB6nEXu4q06xTQ==",
  },
];
const cookieKey = "feather-cookie";
const cookieSecret = process.env.COOKIE_SECRET || "feather-cookie-secret";

export const apiRouter = Router();

apiRouter.use(json());
apiRouter.use(cookieParser(cookieSecret));

apiRouter.post("/signin", (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Bad Request!" });
  }

  const adminCredentials = admins.find((a) => a.email === req.body.email);

  if (!adminCredentials) {
    return res.status(403).json({ message: "Login or password is incorrect!" });
  }

  const [salt, key] = adminCredentials.password.split(":");
  const passwordHash = scryptSync(req.body.password, salt, 64);

  if (!timingSafeEqual(passwordHash, Buffer.from(key, "base64"))) {
    return res.status(403).json({ message: "Login or password is incorrect!" });
  }

  return res
    .cookie(cookieKey, "user", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    })
    .json({ message: "OK" });
});

apiRouter.use((req, res, next) => {
  if (!req.signedCookies[cookieKey]) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  return next();
});

apiRouter.get("/check-auth", (_, res) => res.status(200).json());
apiRouter.post("/signout", (_, res) =>
  res.clearCookie(cookieKey).status(200).json()
);

export function createApp() {
  return express().use("/api", apiRouter);
}
