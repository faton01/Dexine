"use client";

import { useState } from "react";

export function Newsletter({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<{ kind: "idle" | "busy" | "ok" | "error"; msg?: string }>({ kind: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState({ kind: "busy" });
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setState({ kind: "ok", msg: data.message });
      setEmail("");
    } catch (err) {
      setState({ kind: "error", msg: (err as Error).message });
    }
  }

  return (
    <form className={`newsletter newsletter--${tone}`} onSubmit={submit}>
      <label htmlFor={`nl-${tone}`} className="mono">
        letters from the studio — new prints, drops, objects.
      </label>
      <div className="newsletter__row">
        <input
          id={`nl-${tone}`}
          type="email"
          required
          placeholder="your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button type="submit" disabled={state.kind === "busy"}>
          {state.kind === "busy" ? "…" : "subscribe →"}
        </button>
      </div>
      {state.msg && (
        <p className={state.kind === "error" ? "form-error" : "form-ok"} role="status">
          {state.msg}
        </p>
      )}
    </form>
  );
}
