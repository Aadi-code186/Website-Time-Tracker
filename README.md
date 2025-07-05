# Website Time Tracker : Browser Extension
#### Video Demo:  https://www.youtube.com/watch?v=Ir4SmQ9HmHA
#### Description:
## Index
- [Overview](#overview)
- [Features](#features)
- [Project Files and Structure](#project-files-and-structure)
  - [manifest.json](#1-manifestjson)
  - [background.js](#2-backgroundjs)
  - [popup.js](#3-popupjs)
  - [popup.html](#4-popuphtml)
  - [popup.css](#5-popupcss)
  - [README.md](#6-readmemd)
- [Design Choices and Justifications](#design-choices-and-justifications)
- [Future Enhancements](#future-enhancements)
- [Installation and Usage](#installation-and-usage)
- [Conclusion](#conclusion)

## Overview

This project is a **Website Time Tracker : Browser Extension** that helps users monitor their time spent on various websites. The extension records the duration of active website usage, displays daily usage statistics, and stores historical data for up to 30 days. The long-term vision for this project includes implementing a feature to block unproductive sites if a user spends excessive time on them, similar to Google’s Digital Wellbeing.

## Features

- **Real-time website tracking**: Monitors the time spent on active tabs.
- **Daily usage logs**: Stores and organizes website usage data by date.
- **Data persistence**: Saves records locally for up to 30 days, automatically cleaning old data.
- **Intuitive UI**: Displays tracked time in a visually appealing format.
- **Expandable records**: Users can click on a date to view detailed statistics.
- **Service worker keep-alive**: Ensures continuous tracking even when the extension is inactive.
- **Future enhancement**: Planned feature to allow users to block unproductive websites after a set limit.

## Project Files and Structure

### 1. `manifest.json`
This file defines the extension’s metadata, including its name, description, version, permissions, and background script configuration.

### 2. `background.js`
Handles the core functionality of tracking time spent on websites in the background. Key functionalities include:
- Tracking active tabs and recording time spent.
- Storing data in `Browser.storage.local`.
- Automatically cleaning data older than 30 days.
- Keeping the service worker alive to maintain tracking.
- Using `Browser.alarms` to ensure daily cleanup and continuous tracking.

### 3. `popup.js`
Manages the popup UI logic, fetching and displaying stored website usage statistics. Features include:
- Retrieving website usage data from storage.
- Sorting and displaying daily records based on the time spent on websites (descending order).
- Toggling details (show/hide website-specific time logs) when a user clicks a date.
- Fixing time conversion issues to ensure accurate reporting.
- Implementing a function to format time properly:
  ```js
    function formatTime(seconds) {
        if (seconds < 60) return `${seconds}s`;

        const mins = Math.floor(seconds / 60);
        if (mins < 60) return `${mins}m ${seconds % 60}s`;

        const hrs = Math.floor(mins / 60);
        return `${hrs}h ${mins % 60}m ${seconds % 60}s`.replace(/(?:^0h\s*)?(?:^0m\s*)?/, '').trim();
    }
  ```

### 4. `popup.html`
The HTML structure for the popup, which displays tracked data in an easy-to-read format. Includes:
- A title and container for displaying stored website time data.
- A script reference to `popup.js` for handling interactivity.

### 5. `popup.css`
Defines the styles for the popup UI, making it visually appealing and user-friendly. The design includes:
- A gradient background.
- Styled tables for website usage logs.
- Clickable date entries to expand details.
- A clear and readable layout.

### 6. `README.md`
The document you are currently reading, which serves as the primary documentation for this project.

## Design Choices and Justifications

### **Data Storage Approach**
Using `Browser.storage.local` ensures persistence of data across browser sessions without requiring an external database. The extension automatically removes old records after 30 days to prevent excessive storage consumption.

### **Time Tracking Methodology**
Instead of tracking background time on all tabs, the extension focuses on active tabs to provide more accurate data on conscious engagement with websites.

### **Performance Considerations**
- The `Browser.alarms` API ensures that tasks like data cleanup and periodic refreshes are handled efficiently without overloading resources.
- Keeping track of time only on active tabs reduces unnecessary computations.

### **UI and User Experience**
- A clean and visually engaging popup interface makes it easy for users to quickly check their usage.
- Clickable date headers provide a simple way to expand and collapse details without overwhelming the user.
- Colors and typography ensure readability and a modern look.

## Future Enhancements

### **Website Blocking for Productivity**
A planned enhancement is to introduce an option where users can set limits on unproductive websites. If the limit is exceeded, the extension will:
1. Notify the user about excessive usage.
2. Offer an option to block the site temporarily.
3. Provide a productivity mode where users can define a whitelist of allowed websites.

This feature would help users take control of their online habits, similar to Google’s Digital Wellbeing for mobile apps.

## Installation and Usage

### **Installation Steps**
1. Clone or download this repository.
2. Open **Browser** and navigate to `Browser://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the project folder.
5. The extension is now installed and can be accessed from the Browser toolbar.

### **Using the Extension**
- Click the extension icon to view your daily website usage.
- Click on any date to expand details about specific websites.
- The data is automatically updated in the background while you browse.

## Conclusion
This Browser Extension is a useful tool for tracking online activity, helping users manage their time effectively. The planned productivity-enhancing features will make it even more beneficial in the future.

---

**Developer:** Aditya Aditya
**Version:** 1.2  
