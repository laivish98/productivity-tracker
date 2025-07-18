let activeTabId = null;
let activeStartTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTabChange(tab);
  }
});

function handleTabChange(tab) {
  if (!tab.url) return;
  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.storage.sync.get({ blocked: [] }, ({ blocked }) => {
    if (blocked.some(site => domain.includes(site))) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          document.body.innerHTML = "<h1>Blocked for Productivity</h1>";
        }
      });
      return;
    }

    if (activeTabId && activeStartTime) {
      const timeSpent = (Date.now() - activeStartTime) / 1000;
      logTime(domain, timeSpent);
    }

    activeTabId = tab.id;
    activeStartTime = Date.now();
  });
}

function logTime(domain, timeSpent) {
  fetch("http://localhost:5000/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ domain, timeSpent })
  });
}
