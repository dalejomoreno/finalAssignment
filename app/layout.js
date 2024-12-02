import Link from "next/link";
import '../styles/styles.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <Link href="/" className="navbar-brand">
              My Portfolio
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/about" className="nav-link">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/portfolio" className="nav-link">
                    Portfolio
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
