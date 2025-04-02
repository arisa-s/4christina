import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const secret = process.env.NEXT_PUBLIC_SANITY_HOOK_SECRET;

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method Not Allowed" },
      { status: 405 }
    );
  }

  const signature = req.headers.get(SIGNATURE_HEADER_NAME) ?? undefined;
  const body = await req.text();

  if (!signature || !isValidSignature(body, signature, secret!)) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  try {
    const { _type: type, slug } = JSON.parse(body);
    let urlsToRevalidate: string[] = [];
    switch (type) {
      case "miscProse":
        if (slug?.current) {
          urlsToRevalidate = [`/misc-prose`];
        }
        break;

      case "inspiration":
        urlsToRevalidate = [`/inspiration`];
        break;

      case "poetOfTheMonth":
        if (slug?.current) {
          urlsToRevalidate = [`/poet-of-the-month`];

          break;
        }
      case "poetry":
        if (slug?.current) {
          urlsToRevalidate = [`/poetry`];
        }

      case "miscProse":
        if (slug?.current) {
          urlsToRevalidate = [`/misc-prose`];
        }

      case "readingLog":
        if (slug?.current) {
          urlsToRevalidate = [`/reading-log`];
        }
        break;
    }

    await Promise.all(
      urlsToRevalidate.map(async (url) => {
        try {
          await revalidatePath(url);
        } catch (err) {
          console.error(`Failed to revalidate ${url}:`, err);
        }
      })
    );

    return NextResponse.json({
      message: `Revalidated "${type}" with slug "${slug.current}"`,
    });
  } catch (err) {
    console.error("Error revalidating:", err);
    return NextResponse.json(
      { message: `Error revalidating: ${err}` },
      { status: 500 }
    );
  }
}
