function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

function cleanupOldData() {
    let now = new Date();
    let pastDate = new Date(now.setDate(now.getDate() - 30)).toISOString().split('T')[0];
    
    chrome.storage.local.get(null, (data) => {
        Object.keys(data).forEach(key => {
            if (key < pastDate) {
                chrome.storage.local.remove(key);
            }
        });
    });
}

function trackTime() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
        if (!tab || !tab.url) return;

        let domain = new URL(tab.url).hostname;
        let now = Date.now();
        let today = getTodayDate();

        chrome.storage.local.get([today], (data) => {
            let siteData = data[today] || {};
            let lastActiveTime = siteData.lastActiveTime || now;
            let timeSpent = Math.floor((now - lastActiveTime) / 1000);
            
            siteData[domain] = (siteData[domain] || 0) + timeSpent;
            siteData.lastActiveTime = now;
            
            let updatedData = {};
            updatedData[today] = siteData;
            chrome.storage.local.set(updatedData);
        });
    });
}

chrome.alarms.create("midnightReset", { when: new Date().setHours(24, 0, 0, 0), periodInMinutes: 1440 });
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "midnightReset") {
        cleanupOldData();
    }
});

chrome.tabs.onActivated.addListener(trackTime);
chrome.tabs.onUpdated.addListener(trackTime);
chrome.windows.onFocusChanged.addListener(trackTime);

chrome.alarms.create("keepAlive", { periodInMinutes: 0.5 });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "keepAlive") {
        sendResponse("active");
    }
});

chrome.runtime.onSuspend.addListener(trackTime);
