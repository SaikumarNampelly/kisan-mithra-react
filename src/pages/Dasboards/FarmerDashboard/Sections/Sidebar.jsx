function Sidebar({ activeTab, setActiveTab }) {
  const menu = [
    { name: "Buy Seeds", key: "BuySeeds" },
    { name: "Sell Vegetables", key: "SellVegetables" },
    { name: "Book Doctor", key: "BookDoctor" },
    { name: "Buy Pesticides", key: "BuyPesticides" },
    { name: "Orders", key: "Orders" },
    { name: "Appointments", key: "Appointments" },
    { name: "Cart", key: "Cart" },
    { name: "Profile", key: "UserProfile" },
  ];

  return (
    <aside
      className="
        h-full w-72
        text-white
        flex flex-col
        px-8 py-10
bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-800
        relative
      "
    >
      {/* Subtle Top Glow */}
      <div className="absolute top-0 left-0 w-full h-40 bg-emerald-400/10 blur-3xl pointer-events-none" />

      <h2
        className="
          text-xl font-semibold
          tracking-[0.15em]
          text-center
          mb-12
          text-emerald-200
        "
      >
        🌾FARMER PANEL
      </h2>

      <div className="flex flex-col gap-4 relative z-10">
        {menu.map((item) => {
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`
                relative px-6 py-3
                text-left
                rounded-xl
                text-sm tracking-wide
                transition-all duration-300
                ${
                  isActive
                    ? `
                      bg-gradient-to-r from-[#d4af37]/20 to-[#f5d76e]/10
                      text-[#f5d76e]
                      border border-[#d4af37]/40
                      shadow-[0_0_20px_rgba(212,175,55,0.3)]
                    `
                    : `
                      text-emerald-200/80
                      hover:text-white
                      hover:bg-white/5
                    `
                }
              `}
            >
              {item.name}

              {/* Luxury Gold Side Line */}
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#d4af37] rounded-r-md" />
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Signature */}
      <div className="mt-auto pt-10 text-xs text-emerald-300/50 tracking-widest text-center">
        KISAN MITRA • PREMIUM
      </div>
    </aside>
  );
}

export default Sidebar;
