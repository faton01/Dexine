import { NextResponse } from "next/server";

/** Subscribes an email via Buttondown. Swap the fetch for Mailchimp/Klaviyo if preferred. */
export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  const key = process.env.BUTTONDOWN_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "The newsletter isn't open yet — check back soon." }, { status: 503 });
  }
  const res = await fetch("https://api.buttondown.com/v1/subscribers", {
    method: "POST",
    headers: { Authorization: `Token ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email_address: email }),
  });
  if (res.ok) return NextResponse.json({ message: "You're in. Check your inbox to confirm." });
  if (res.status === 400 || res.status === 409) {
    return NextResponse.json({ message: "You're already on the list." });
  }
  return NextResponse.json({ error: "Couldn't subscribe right now. Please try again." }, { status: 502 });
}
