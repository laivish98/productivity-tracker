document.getElementById("blockBtn").addEventListener("click", () => {
  const site = document.getElementById("blockSiteInput").value.trim();
  if (!site) return;

  chrome.storage.sync.get({ blocked: [] }, (data) => {
    const updated = Array.from(new Set([...data.blocked, site]));
    chrome.storage.sync.set({ blocked: updated }, () => {
      alert(`${site} has been blocked.`);
      document.getElementById("blockSiteInput").value = "";
      loadBlockedSites(); // Refresh if open
    });
  });
});

document.getElementById("showBlockedBtn").addEventListener("click", () => {
  const list = document.getElementById("blockedList");
  if (list.style.display === "none") {
    loadBlockedSites();
    list.style.display = "block";
  } else {
    list.style.display = "none";
  }
});

function loadBlockedSites() {
  const blockedDiv = document.getElementById("blockedList");
  blockedDiv.innerHTML = "<strong>Blocked Sites:</strong><br>";

  chrome.storage.sync.get({ blocked: [] }, (data) => {
    if (data.blocked.length === 0) {
      blockedDiv.innerHTML += "<p>No sites blocked.</p>";
      return;
    }

    data.blocked.forEach((site, index) => {
      const p = document.createElement("p");
      p.innerHTML = `
        ${site}
        <button class="unblockBtn" data-index="${index}">Unblock</button>
      `;
      blockedDiv.appendChild(p);
    });
  });
}

// 🧠 Handle unblock button clicks with delegation
document.getElementById("blockedList").addEventListener("click", (e) => {
  if (e.target.classList.contains("unblockBtn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    const siteName = e.target.parentElement.textContent.trim().replace("Unblock", "");
    if (confirm(`Unblock "${siteName}"?`)) {
      chrome.storage.sync.get({ blocked: [] }, (data) => {
        const updated = data.blocked;
        updated.splice(index, 1);
        chrome.storage.sync.set({ blocked: updated }, () => {
          loadBlockedSites();
        });
      });
    }
  }
});

// 🧠 Show Productivity Report
fetch("http://localhost:5000/api/report/today")
  .then((res) => res.json())
  .then((data) => {
    const reportDiv = document.getElementById("report");
    reportDiv.innerHTML = "";

    let totalTime = 0;

    Object.entries(data).forEach(([domain, time]) => {
      totalTime += time;

      const p = document.createElement("p");
      p.innerHTML = `
        ${domain}: ${Math.round(time)}s
        <select class="tag" data-domain="${domain}">
          <option value="">Mark as</option>
          <option value="productive">Productive</option>
          <option value="unproductive">Unproductive</option>
        </select>
      `;
      reportDiv.appendChild(p);
    });

    const totalP = document.createElement("p");
    totalP.innerHTML = `<strong>Total Time:</strong> ${Math.round(totalTime)}s`;
    reportDiv.appendChild(totalP);
  })
  .catch((err) => {
    console.error("Failed to fetch report:", err);
  });
