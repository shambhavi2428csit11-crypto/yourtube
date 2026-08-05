import React from "react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "shorts", label: "Shorts" },
  { id: "playlists", label: "Playlists" },
  { id: "community", label: "Community" },
  { id: "about", label: "About" },
];

const ChannelTabs = ({ activeTab, setActiveTab }: any) => {
  return (
    <div className="border-b border-gray-200 mt-4">
      <div className="flex gap-6 px-4 md:px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 pt-2 text-sm font-medium border-b-[3px] transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-black border-black"
                : "text-gray-500 border-transparent hover:text-black hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChannelTabs;