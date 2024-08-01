import React, { useState, useEffect } from "react";

function StorageUsage() {
  const [usagePercentage, setUsagePercentage] = useState(null);

  useEffect(() => {
    // Check if the browser supports the StorageManager API
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      // Retrieve storage estimate
      navigator.storage.estimate().then(estimate => {
        // Calculate usage percentage
        const usagePercentage = (estimate.usage / estimate.quota) * 100;

        // Update state with usage percentage
        setUsagePercentage(usagePercentage.toFixed(2));
      });
    }
  }, []);

  return (
    <div>
      Storage Usage: {usagePercentage !== null ? `${usagePercentage}%` : "Loading..."}
    </div>
  );
}

export default StorageUsage;
