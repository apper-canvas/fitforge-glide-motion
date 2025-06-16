import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { routes } from '@/config/routes';

const Layout = () => {
  const location = useLocation();
  const isSetupPage = location.pathname === '/setup';

  // Main navigation tabs (excluding setup)
  const mainTabs = Object.values(routes).filter(route => route.id !== 'setup');

  if (isSetupPage) {
    return (
<div className="h-screen bg-background overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
<div className="h-screen flex flex-col bg-background overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
<nav className="flex-shrink-0 bg-card border-t border-surface-300 px-4 py-2 safe-area-pb">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {mainTabs.map((route, index) => {
            const isActive = location.pathname === route.path;
            const isCenter = index === Math.floor(mainTabs.length / 2);
            
            return (
              <NavLink
                key={route.id}
                to={route.path}
                className="relative flex flex-col items-center justify-center min-w-0 flex-1"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200
${isCenter 
                      ? `w-16 h-16 ${isActive ? 'bg-primary shadow-lg shadow-primary/30' : 'bg-surface-200'}`
                      : `w-12 h-12 ${isActive ? 'bg-primary/20' : 'hover:bg-surface-200'}`
                    }
                  `}
                >
                  <ApperIcon
                    name={route.icon}
                    size={isCenter ? 28 : 20}
className={`
                      ${isActive 
                        ? 'text-white' 
                        : 'text-surface-600'
                      }
                    `}
                  />
                </motion.div>
                
<span className={`
                  text-xs mt-1 font-medium transition-colors duration-200
                  ${isActive ? 'text-primary' : 'text-surface-600'}
                `}>
                  {route.label}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 w-1 h-1 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Layout;