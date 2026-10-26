import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Contact form submitted:", form);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div>
            <h2>Get in Touch</h2>
            <p>Questions about a piece or an order? Send us a message.</p>
          </div>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-info-item">
              <Mail />
              <span>hello@interiorstudio.com</span>
            </div>
            <div className="contact-info-item">
              <Phone size={15} />
              <span>+251 911 234 567</span>
            </div>
            <div className="contact-info-item">
              <MapPin size={15} />
              <span>Bole Road, Addis Ababa, Ethiopia</span>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Message
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
            {sent && <p className="contact-success">Thanks — we'll get back to you soon.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}