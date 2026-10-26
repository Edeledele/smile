"use client";

export default function ContactPage() {
  return (
    <section className="section page-section">
      <div className="container" style={{ maxWidth: "700px" }}>
        <div className="page-intro">
          <span className="eyebrow">GET IN TOUCH</span>
          <h1>Contact <em>Us</em></h1>
          <p>We’d love to hear from you. Questions, catering requests, or just craving details.</p>
        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent.");
          }}
        >
          <h2>Send us a message</h2>
          <label>
            Your Name
            <input required placeholder="Full Name" />
          </label>
          <label>
            Email Address
            <input required type="email" placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea required rows="4" placeholder="How can we help you?" />
          </label>
          <button type="submit" className="button-primary full-button">
            Send Message →
          </button>
        </form>
      </div>
    </section>
  );
}
