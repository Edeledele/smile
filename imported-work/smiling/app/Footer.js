export default function Footer() {
  return (
    <footer style={
      { textAlign: "center",
       padding: "40px",
        background: "var(--ink)",
         color: "white", 
         marginTop: "auto" }}>
      <p>&copy; {new Date().getFullYear()} Smiling Studio. All rights reserved.</p>
    </footer>
  );
}
