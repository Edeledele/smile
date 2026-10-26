import Link from "next/link";

export const metadata = {
  title: "About Us | Addis Eats",
  description: "Learn more about Addis Eats and our journey bringing authentic Ethiopian cuisine to your table.",
};

export default function AboutPage() {
  return (
    <section className="section page-section">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="page-intro">
          <span className="eyebrow">OUR STORY</span>
          <h1>About <em>Addis Eats</em></h1>
          <p>Real Food. Real Flavor. Authentic Ethiopian heritage in every bite.</p>
        </div>

        <div style={{ background: "#ffffff", padding: "36px", borderRadius: "16px", border: "1px solid #ece6dc", lineHeight: "1.8", color: "#463c33" }}>
          <p style={{ marginBottom: "18px" }}>
            At <strong>Addis Eats</strong>, we believe food is more than sustenance—it is fellowship, history, and warmth shared around the <em>mesob</em>. From our kitchen to your doorstep, every recipe honors generations-old traditions of Ethiopian culinary artistry.
          </p>
          <p style={{ marginBottom: "18px" }}>
            We source authentic spices straight from the highlands of Ethiopia, from rich, fragrant berbere to aromatic niter kibbeh, paired with fresh, teff-crafted injera baked to perfection every morning.
          </p>
          <div style={{ marginTop: "28px" }}>
            <Link href="/menu" className="button-primary">
              Explore Our Menu →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
