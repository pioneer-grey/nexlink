import { NextResponse } from "next/server";

export function handleApiError(err: unknown) {
  console.error(err); 

  if (err instanceof Error) {
    switch (err.message) {
      case "Invalid URL":
      case "Invalid URL protocol":
      case "Unable to resolve hostname":
        return NextResponse.json(
          { error: err.message },
          { status: 400 }
        );

      case "Localhost URLs are not allowed":
      case "Private IPs are not allowed":
      case "URL resolves to a private IP":
        return NextResponse.json(
          { error: err.message },
          { status: 403 }
        );
    }
  }

  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
}