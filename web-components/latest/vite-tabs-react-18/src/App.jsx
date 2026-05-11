import { useState, useEffect, useRef } from 'react';
import '@carbon/web-components/es/components/tabs/index.js';
import '@carbon/web-components/es/components/button/index.js';

function App() {
  const defaultTabs = [
    { id: 'tab-1', label: 'Tab 1', target: 'panel-1', value: 'tab-1' },
    { id: 'tab-2', label: 'Tab 2', target: 'panel-2', value: 'tab-2' },
    { id: 'tab-3', label: 'Tab 3', target: 'panel-3', value: 'tab-3' },
    { id: 'tab-4', label: 'Tab 4', target: 'panel-4', value: 'tab-4' },
  ];

  const [tabs, setTabs] = useState([...defaultTabs]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabsRef = useRef(null);

  useEffect(() => {
    const tabsElement = tabsRef.current;
    if (!tabsElement) return;

    const handleTabClosed = (event) => {
      const { index } = event.detail;
      setTabs(prevTabs => prevTabs.filter((_, i) => i !== index));
      
      // Adjust selected index if needed
      if (index === selectedIndex && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (index < selectedIndex) {
        setSelectedIndex(selectedIndex - 1);
      }
    };

    const handleTabSelected = (event) => {
      setSelectedIndex(event.detail.index);
    };

    tabsElement.addEventListener('cds-tab-closed', handleTabClosed);
    tabsElement.addEventListener('cds-tabs-selected', handleTabSelected);

    return () => {
      tabsElement.removeEventListener('cds-tab-closed', handleTabClosed);
      tabsElement.removeEventListener('cds-tabs-selected', handleTabSelected);
    };
  }, [selectedIndex]);

  const resetTabs = () => {
    setTabs([...defaultTabs]);
    setSelectedIndex(0);
  };

  return (
    <div>
      <h1>Carbon Tabs with React</h1>
      <p>This example demonstrates using Carbon's dismissable tabs web component in a React application.</p>
      
      <cds-button style={{ marginBottom: '2rem' }} onClick={resetTabs}>
        Reset Tabs
      </cds-button>

      <cds-tabs
        ref={tabsRef}
        dismissable
        selected-index={selectedIndex}
      >
        {tabs.map(tab => (
          <cds-tab
            key={tab.id}
            id={tab.id}
            target={tab.target}
            value={tab.value}
          >
            {tab.label}
          </cds-tab>
        ))}
      </cds-tabs>

      <div className="cds-tab-panels">
        {tabs.map((tab, index) => (
          <div
            key={tab.id}
            id={tab.target}
            role="tabpanel"
            aria-labelledby={tab.id}
            hidden={selectedIndex !== index}
          >
            <h2>{tab.label}</h2>
            <p>Content for {tab.label}</p>
            <p>This panel is dynamically managed by React state.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


