/// <reference types="vitest/globals" />
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: mockPush }),
}));

describe("Navbar", () => {
  it("renders the logo image", () => {
    render(<Navbar />);
    const logo = screen.getByAltText("Global Mission for Christ International");
    expect(logo).toBeInTheDocument();
    expect(logo.getAttribute("src")).toContain(encodeURIComponent("/images/gmfc-logo.png"));
  });

  it("renders brand text", () => {
    render(<Navbar />);
    expect(screen.getByText("Global Mission")).toBeInTheDocument();
    expect(screen.getByText("For Christ International")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Navbar />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Events")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders Give button in nav", () => {
    render(<Navbar />);
    expect(screen.getByText("Give")).toBeInTheDocument();
  });

  it("toggles mobile menu on hamburger click", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle menu");
    const nav = document.querySelector(".gmfci-main-nav");

    expect(nav?.classList.contains("open")).toBe(false);

    fireEvent.click(hamburger);
    expect(nav?.classList.contains("open")).toBe(true);

    fireEvent.click(hamburger);
    expect(nav?.classList.contains("open")).toBe(false);
  });

  it("shows Home as active on root path", () => {
    render(<Navbar />);
    const homeLink = screen.getByText("Home").closest("li");
    expect(homeLink?.classList.contains("active")).toBe(true);
  });

  it("hamburger has correct aria-expanded attribute", () => {
    render(<Navbar />);
    const hamburger = screen.getByLabelText("Toggle menu");
    expect(hamburger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(hamburger);
    expect(hamburger.getAttribute("aria-expanded")).toBe("true");
  });
});
