
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Calendar, 
  BookOpen, 
  Star, 
  Settings,
  MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAuthenticated = location.pathname !== "/" && 
                         location.pathname !== "/login" && 
                         location.pathname !== "/register";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const NavLink = ({ to, children, icon: Icon, onClick }: { 
    to: string;
    children: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200",
          isActive 
            ? "bg-primary text-primary-foreground font-medium" 
            : "hover:bg-secondary"
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-6 md:px-10",
        isScrolled || isAuthenticated
          ? "py-3 bg-white/80 backdrop-blur-lg shadow-subtle" 
          : "py-5 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground font-bold text-xl h-8 w-8 rounded-md flex items-center justify-center">
              T
            </span>
            <span className="font-display font-bold text-xl hidden sm:block">
              TutorHaven
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isAuthenticated ? (
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard" icon={BookOpen}>Dashboard</NavLink>
            <NavLink to="/schedule" icon={Calendar}>Schedule</NavLink>
            <NavLink to="/sessions" icon={MessageSquare}>Sessions</NavLink>
            <NavLink to="/profile" icon={User}>Profile</NavLink>
            <Button variant="ghost" className="flex items-center gap-2 ml-2" asChild>
              <Link to="/login">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Link>
            </Button>
          </nav>
        ) : (
          <div className="hidden md:flex items-center gap-2">
            {location.pathname !== "/login" && (
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
            )}
            {location.pathname !== "/register" && (
              <Button asChild>
                <Link to="/register">Join as a Tutor</Link>
              </Button>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-secondary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-background z-30 md:hidden transition-transform duration-300 pt-20",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col p-6 gap-2">
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" icon={BookOpen} onClick={closeMobileMenu}>Dashboard</NavLink>
              <NavLink to="/schedule" icon={Calendar} onClick={closeMobileMenu}>Schedule</NavLink>
              <NavLink to="/sessions" icon={MessageSquare} onClick={closeMobileMenu}>Sessions</NavLink>
              <NavLink to="/profile" icon={User} onClick={closeMobileMenu}>Profile</NavLink>
              <NavLink to="/settings" icon={Settings} onClick={closeMobileMenu}>Settings</NavLink>
              <div className="h-[1px] bg-border my-2"></div>
              <Button variant="ghost" className="flex items-center justify-start gap-2 w-full" asChild>
                <Link to="/login" onClick={closeMobileMenu}>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Link>
              </Button>
            </>
          ) : (
            <>
              {location.pathname !== "/" && (
                <NavLink to="/" onClick={closeMobileMenu}>Home</NavLink>
              )}
              {location.pathname !== "/login" && (
                <NavLink to="/login" onClick={closeMobileMenu}>Log in</NavLink>
              )}
              {location.pathname !== "/register" && (
                <NavLink to="/register" onClick={closeMobileMenu}>Register</NavLink>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
