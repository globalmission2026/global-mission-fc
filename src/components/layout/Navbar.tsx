"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Sermons",  href: "/sermons" },
  { label: "Events",   href: "/events" },
  { label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="gmfci-site-header">
      <div className="gmfci-header-inner">

        {/* Logo / Brand */}
        <Link href="/" className="gmfci-logo-link" onClick={() => setMenuOpen(false)}>
          {/* Logo image goes here when available */}
          {/* <img src="/images/gmfc-logo.png" alt="Global Mission FCI Logo" /> */}
          <div id="gmfci-site-brand">
            <span className="gmfci-brand-top">Global Mission</span>
            <span className="gmfci-brand-bottom">For Christ International</span>
          </div>
        </Link>

        {/* Separator */}
        <span className="gmfci-nav-separator" aria-hidden="true"></span>

        {/* Navigation */}
        <nav aria-label="Main navigation">
          <ul className={`gmfci-main-nav${menuOpen ? " open" : ""}`}>
            {navItems.map((item) => (
              <li key={item.href} className={pathname === item.href ? "active" : ""}>
                <Link href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="nav-give">
              <Link href="/give" onClick={() => setMenuOpen(false)}>
                Give
              </Link>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
        <button
          className="gmfci-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>
    </header>
  );
}
