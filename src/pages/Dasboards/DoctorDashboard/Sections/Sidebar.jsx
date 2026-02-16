import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    { name: "Requests", key: "Requests" },
    { name: "My Appointments", key: "Appointments" },
    { name: "Video", key: "VideoConsultation" },
    { name: "Payments", key: "Payments" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside className="
      h-full w-70
      bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-700
      text-white
      flex flex-col
      px-6 py-8
      shadow-xl
    ">

      {/* Header */}
      <h2 className="
        text-lg font-semibold
        tracking-wide
        mb-8
        text-center
        border-b border-emerald-600
        pb-4
      ">
        🩺Doctor Panel
      </h2>

      {/* Menu */}
      <div className="flex flex-col gap-3">
        {menu.map((item) => {
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`
                relative w-full text-left
                px-4 py-3
                rounded-lg
                text-sm font-medium
                transition-all duration-300
                ${
                  isActive
                    ? `
                      bg-white text-emerald-900
                      shadow-md
                    `
                    : `
                      text-emerald-100
                      hover:bg-emerald-700
                      hover:text-white
                    `
                }
              `}
            >
              {item.name}

              {/* Active Accent Line */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="
        mt-auto pt-8
        text-xs text-emerald-200/60
        text-center
        border-t border-emerald-600
      ">
        DOCTOR PORTAL • SECURE
      </div>

    </aside>
  );
};

export default Sidebar;
