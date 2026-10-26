import Link from "next/link";
export default function NotFound() {
  return <section className="section page-section"><div className="container empty-state"><span>🍽️</span><h1>Oops, not on the menu.</h1><p>We couldn't find that page.</p><Link href="/" className="button button-primary">Back home</Link></div></section>;
}
