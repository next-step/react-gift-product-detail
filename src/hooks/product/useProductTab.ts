import { useState } from 'react';

function useProductTab() {
  const [activeTab, setActiveTab] = useState<'description' | 'review' | 'detail'>('description');

  return {
    activeTab,
    setActiveTab,
  };
}

export default useProductTab; 