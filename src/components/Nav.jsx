import Link from "next/link";

export default function Navigation() {
  const elements = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Giới thiệu",
      link: "/about",
    },
    {
      name: "Bảng giá",
      link: "/pricing",
    },
    {
      name: "Tài liệu",
      link: "/document",
    },
    {
      name: "Điều khoản",
      link: "/tos",
    },
    {
      name: "Riêng tư",
      link: "/pripol",
    },
    {
      name: "Đăng nhập",
      link: "/login",
    },
    {
      name: "Dùng thử",
      link: "/demo",
    },
  ];

  return (
    <nav className="topnav">
      <Link href="/" className="logo">
        <div className="logo-dot"></div>
        MediScribe<span style={{ color: "var(--pink)" }}>AI</span>
      </Link>

      <div className="nav-links">
        {elements.map((item) => (
          <Link key={item.link} href={item.link} className="nav-link">
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
