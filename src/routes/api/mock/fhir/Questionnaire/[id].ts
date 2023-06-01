import type { APIEvent } from "solid-start/api";
// solidstart api route GET ?identifier=123

export function GET(event: APIEvent) {
  console.log("event: ", event);
  console.log(
    "event.request.url: ",
    event.request.url,
    new URL(event.request.url).searchParams.get("identifier")
  );
  return new Response("Hello World");
}
