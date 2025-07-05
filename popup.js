document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(null, (data) => {
        let displayData = document.getElementById("data");
        displayData.innerHTML = ""; // Clear "Loading..."

        if (!Object.keys(data).length) {
            displayData.innerHTML = "<p>No data found!</p>";
            return;
        }
        Object.keys(data).sort().reverse().forEach(date => {
            let siteData = data[date];
        
            // Filter out "lastActiveTime"
            if (!siteData || siteData.hasOwnProperty("lastActiveTime")) {
                delete siteData.lastActiveTime; // Remove it from the object
            }
        
            let dateEntry = document.createElement("div");
            dateEntry.innerHTML = `<h3>${date}</h3>`;
        
            // Sort websites by time spent (descending order)
            let sortedSites = Object.entries(siteData).sort((a, b) => b[1] - a[1]);
        
            let totalSeconds = sortedSites.reduce((acc, [_, time]) => acc + time, 0);
            let totalTime = document.createElement("p");
            totalTime.textContent = `Total Time Spent: ${formatTime(totalSeconds)}`;
            totalTime.style.fontWeight = "bold";
            totalTime.style.color = "#222";
            totalTime.style.marginBottom = "5px";
        
            let table = document.createElement("table");
            table.style.display = "none"; // Initially hide table
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Website</th>
                        <th>Time Spent</th>
                    </tr>
                </thead>
                <tbody>
                    ${sortedSites.map(([site, time]) => `
                        <tr>
                            <td>${site}</td>
                            <td>${formatTime(time)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
        
            dateEntry.appendChild(totalTime);
            dateEntry.appendChild(table);
        
            dateEntry.addEventListener("click", () => {
                table.style.display = table.style.display === "none" ? "table" : "none";
            });
        
            displayData.appendChild(dateEntry);
        });
    });
});

// Function to format time properly
function formatTime(seconds) {
    if (seconds < 60) return `${seconds}s`;

    const mins = Math.floor(seconds / 60);
    if (mins < 60) return `${mins}m ${seconds % 60}s`;

    const hrs = Math.floor(mins / 60);
    return `${hrs}h ${mins % 60}m ${seconds % 60}s`.replace(/(?:^0h\s*)?(?:^0m\s*)?/, '').trim();
}
