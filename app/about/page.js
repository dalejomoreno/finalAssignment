// Archivo: proj1>app>about>page.js
import Link from 'next/link';

export default function About() {
  return (
    <div className="container text-center py-20">
      <h1 className="fw-bolder mb-4">About Us</h1>
      <p className="lead mb-4">
        We are a modern platform designed to provide smooth navigation and a responsive design.
        Explore our services and get to know more about us.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}
