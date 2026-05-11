import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs",
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
): Promise<void> {
  try {
    // Dynamically import the server entry point
    // @ts-expect-error - dist/server/index.js is a generated file without type declarations
    const serverModule = (await import("../dist/server/index.js")) as any;
    
    const serverEntry = serverModule.default || serverModule;

    if (!serverEntry || typeof serverEntry.fetch !== "function") {
      console.error("Server entry:", serverEntry);
      response.status(500).json({
        error: "Server entry not found or invalid",
        has_default: !!serverModule.default,
        has_fetch: !!serverEntry?.fetch,
      });
      return;
    }

    // Create a Web API Request from Vercel request
    const protocol = (request.headers["x-forwarded-proto"] as string) || "https";
    const host = (request.headers["x-forwarded-host"] as string) || request.headers.host;
    const url = new URL(`${protocol}://${host}${request.url}`);

    let body: BodyInit | undefined;
    if (request.method !== "GET" && request.method !== "HEAD") {
      body = JSON.stringify(request.body || {});
    }

    const webRequest = new Request(url, {
      method: request.method,
      headers: new Headers(request.headers as Record<string, string>),
      body,
    });

    // Call the server entry
    const webResponse = await serverEntry.fetch(webRequest, {}, {});

    // Convert Web API Response to Vercel response
    response.status(webResponse.status);
    webResponse.headers.forEach((value: string, key: string) => {
      response.setHeader(key, value);
    });

    if (webResponse.body) {
      const text = await webResponse.text();
      response.send(text);
    } else {
      response.end();
    }
  } catch (error) {
    console.error("Server error:", error);
    response.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
