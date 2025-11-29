import NavigationItem from "@/app/components/layout/Navigation/NavigationItem";
import NavigationDropdown from "@/app/components/layout/Navigation/NavigationDropdown";

export default function DesktopNavigation() {
  const navigationItems = [
    { label: "New Arrivals", href: "#" },
    {
      label: "Women",
      href: "#",
      submenu: ["Dresses", "Tops", "Bottoms", "Activewear"],
    },
    {
      label: "Men",
      href: "#",
      submenu: ["Shirts", "Pants", "Outerwear", "Accessories"],
    },
    { label: "Collections", href: "#" },
    { label: "Sale", href: "#" },
  ];

  return (
    <nav className="hidden lg:flex items-center space-x-8">
      {navigationItems.map((item) =>
        item.submenu ? (
          <NavigationDropdown
            key={item.label}
            label={item.label}
            items={item.submenu}
          />
        ) : (
          <NavigationItem
            key={item.label}
            label={item.label}
            href={item.href}
          />
        )
      )}
    </nav>
  );
}