"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, Calendar, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase-client";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Messages", href: "/admin/messages", icon: MessageSquare },
  { label: "Events", href: "/admin/events", icon: Calendar },
];

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <div className="gmfci-admin-layout">
      <aside className="gmfci-admin-sidebar">
        <div className="gmfci-admin-brand">
          <img src="/images/gmfc-logo.png" alt="GMFCI" />
          <h2>Admin Panel</h2>
        </div>

        <nav className="gmfci-admin-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`gmfci-admin-nav-item${isActive ? " active" : ""}`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="gmfci-admin-logout">
          <button onClick={handleLogout} className="gmfci-admin-logout-btn">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="gmfci-admin-main">
        <div className="gmfci-admin-topbar">
          <h1>{navItems.find((i) => pathname === i.href || pathname.startsWith(i.href + "/"))?.label || "Admin"}</h1>
        </div>
        <div className="gmfci-admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
