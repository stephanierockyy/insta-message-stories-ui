
// This file is kept but no longer in use after removing the footer navbar
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: PlusSquare, label: 'Create', path: '/create' },
    { icon: Heart, label: 'Activity', path: '/activity' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-14">
      <div className="mobile-container h-full flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-1/5 h-full",
              path === item.path 
                ? "text-purple-500" 
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <item.icon size={22} />
            <span className="text-xs mt-0.5">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
