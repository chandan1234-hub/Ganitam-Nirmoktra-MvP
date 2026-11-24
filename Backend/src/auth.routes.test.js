import assert from "node:assert/strict";
import { once } from "node:events";
import test from "node:test";
import { app } from "./app.js";

test("API routes reject requests without a Clerk token", async (t) => {
    const server = app.listen(0, "127.0.0.1");
    await once(server, "listening");
    t.after(() => new Promise((resolve) => server.close(resolve)));

    const { port } = server.address();
    const protectedRoutes = [
        ["GET", "/api/solver/history"],
        ["POST", "/api/solver/solve"],
        ["POST", "/api/solver/history"],
        ["POST", "/api/ocr/extract"],
        ["POST", "/api/user/sync"],
        ["GET", "/api/user/usage"],
    ];

    for (const [method, path] of protectedRoutes) {
        const response = await fetch(`http://127.0.0.1:${port}${path}`, {
            method,
            headers: method === "POST" ? { "Content-Type": "application/json" } : {},
            body: method === "POST" ? "{}" : undefined,
        });

        assert.equal(response.status, 401, `${method} ${path} should require authentication`);
    }
});
