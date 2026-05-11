import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    // Import the server entry point
    const serverModule = await import("../dist/server/index.js");
    const serverEntry = serverModule.default;

    // Create a Web API Request from Vercel request
    const url = new URL(request.url || "/", `https://${request.headers.host}`);
    const webRequest = new Request(url, {
      method: request.method,
      headers: request.headers as HeadersInit,
      body:
        request.method === "GET" || request.method === "HEAD"
          ? undefined
          : Buffer.from(await new Promise<Buffer>((resolve, reject) => {
              let data = Buffer.alloc(0);
              request.on("data", (chunk) => {
                data = Buffer.concat([data, chunk]);
              });
              request.on("end", () => resolve(data));
              request.on("error", reject);
            })),
    });

    // Call the server entry
    const webResponse = await serverEntry.fetch(webRequest, {}, {});

    // Convert Web API Response to Vercel response
    response.status(webResponse.status);
    webResponse.headers.forEach((value, key) => {
      response.setHeader(key, value);
    });

    response.send(await webResponse.text());
  } catch (error) {
    console.error("Server error:", error);
    response.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
