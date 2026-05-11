import { useState } from 'react';
import { CdsTabs, CdsTab, CdsButton } from './carbon-wrappers';

function App() {
  const defaultTabs = [
    { id: 'tab-1', label: 'Tab 1', target: 'panel-1', value: 'tab-1' },
    { id: 'tab-2', label: 'Tab 2', target: 'panel-2', value: 'tab-2' },
    { id: 'tab-3', label: 'Tab 3', target: 'panel-3', value: 'tab-3' },
    { id: 'tab-4', label: 'Tab 4', target: 'panel-4', value: 'tab-4' },
  ];

  const [tabs, setTabs] = useState([...defaultTabs]);
  const [selectedIndex, setSelectedIndex] = useState(0);

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

  const resetTabs = () => {
    setTabs([...defaultTabs]);
    setSelectedIndex(0);
  };

  return (
    <div>
      <h1>Carbon Tabs with React 17</h1>
      <p>This example uses <code>@lit/react</code> wrapper for better web component compatibility in React 17.</p>
      
      <CdsButton style={{ marginBottom: '2rem' }} onClick={resetTabs}>
        Reset Tabs
      </CdsButton>

      <CdsTabs
        dismissable
        selectedIndex={selectedIndex}
        onCdsTabClosed={handleTabClosed}
        onCdsTabsSelected={handleTabSelected}
      >
        {tabs.map(tab => (
          <CdsTab
            key={tab.id}
            id={tab.id}
            target={tab.target}
            value={tab.value}
          >
            {tab.label}
          </CdsTab>
        ))}
      </CdsTabs>

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
            <p>This panel is dynamically managed by React 17 state using @lit/react wrappers.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;


