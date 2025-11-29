import Logo from "@/app/components/layout/Logo";
import DesktopNavigation from "@/app/components/layout/Navigation/DesktopNavigation";
import HeaderActions from "@/app/components/layout/HeaderActions/HeaderActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo />
          <DesktopNavigation />
          <HeaderActions />
        </div>
      </div>
    </header>
  );
}