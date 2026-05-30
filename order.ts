import { handleOrderRequest } from "../artifacts/api-server/src/lib/process-order";

type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
};

type VercelResponse = {
  status: (code: number) => { json: (body: Record<string, unknown>) => void };
};

function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  return (cookieHeader ?? "")
    .split(";")
    .map((c) => c.trim().split("="))
    .reduce<Record<string, string>>((acc, [k, v]) => {
      if (k && v) acc[k] = decodeURIComponent(v);
      return acc;
    }, {});
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ success: false, error: "Method not allowed" });
    return;
  }

  const forwarded = req.headers["x-forwarded-for"];
  const clientIp =
    typeof forwarded === "string"
      ? forwarded.split(",")[0]?.trim()
      : Array.isArray(forwarded)
        ? forwarded[0]
        : undefined;

  const cookies = parseCookies(
    typeof req.headers.cookie === "string" ? req.headers.cookie : undefined,
  );
  const userAgent = req.headers["user-agent"];
  const result = await handleOrderRequest(req.body, {
    clientIp,
    userAgent: typeof userAgent === "string" ? userAgent : undefined,
    fbp: cookies._fbp,
    fbc: cookies._fbc,
  });

  res.status(result.status).json(result.body);
}
