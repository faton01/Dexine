import Link from "next/link";

export default function NotFound() {
  return (
    <div className="status-page">
      <h1 className="display-xxl">4<span className="blue">0</span>4</h1>
      <p className="lede">This page has wandered off the canvas.</p>
      <Link href="/" className="btn btn--blue">home</Link>
    </div>
  );
}
