import React, { useState } from "react";

const Tabs = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="tabs">
            <div className="flex space-x-4">
                {data.map((tab, index) => (
                    <button
                        key={index}
                        className={`px-3 py-2 text-md font-medium rounded ${activeTab === index ? 'bg-purple-400 text-white' : 'bg-gray-200 text-gray-700'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="mt-4">
                {data[activeTab] && <div>{data[activeTab].content}</div>}
            </div>
        </div>
    );
};

export default Tabs;