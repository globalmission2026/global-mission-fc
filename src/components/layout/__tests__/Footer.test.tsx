import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("Footer", () => {
  it("renders copyright with current year", () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(new RegExp(String(year)))).toBeInTheDocument();
    const brandTexts = screen.getAllByText(/global mission for christ international/i);
    expect(brandTexts.length).toBeGreaterThanOrEqual(1);
  });

  it("renders phone numbers", () => {
    render(<Footer />);
    expect(screen.getByText("+1 (512) 785 6994")).toBeInTheDocument();
    expect(screen.getByText("+254 721 341793")).toBeInTheDocument();
  });

  it("renders email address", () => {
    render(<Footer />);
    expect(screen.getByText("globalmissionfc@gmail.com")).toBeInTheDocument();
  });

  it("renders postal address", () => {
    render(<Footer />);
    expect(screen.getByText(/P.O. Box 444/)).toBeInTheDocument();
  });

  it("renders quick links", () => {
    render(<Footer />);
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.getByText("Latest Sermons")).toBeInTheDocument();
    expect(screen.getByText("Upcoming Events")).toBeInTheDocument();
    expect(screen.getByText("Mission Gallery")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
  });

  it("renders resources links", () => {
    render(<Footer />);
    expect(screen.getByText("Sermon Archive")).toBeInTheDocument();
    expect(screen.getByText("Events Calendar")).toBeInTheDocument();
    expect(screen.getByText("Prayer Requests")).toBeInTheDocument();
  });

  it("renders subscribe form with email input", () => {
    render(<Footer />);
    expect(screen.getByPlaceholderText("Your email address")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Subscribe" })).toBeInTheDocument();
  });

  it("renders social media links with accessible labels", () => {
    render(<Footer />);
    expect(screen.getByLabelText("Facebook")).toBeInTheDocument();
    expect(screen.getByLabelText("YouTube")).toBeInTheDocument();
    expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
  });

  it("renders Give / Donate CTA button", () => {
    render(<Footer />);
    expect(screen.getByText("Partner With Us in the Mission")).toBeInTheDocument();
    const giveBtns = screen.getAllByText("Give / Donate");
    expect(giveBtns.length).toBeGreaterThanOrEqual(1);
    expect(giveBtns[0].closest("a")).toHaveAttribute("href", "/give");
  });

  it("renders mission quote", () => {
    render(<Footer />);
    expect(screen.getByText(/propagating revival/i)).toBeInTheDocument();
  });
});
