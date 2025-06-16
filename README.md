# 🎉 ShareDRP

> Peer-to-peer file sharing using WebRTC and PocketBase.

**ShareDRP** is a lightweight, server-assisted P2P file-sharing platform using **WebRTC** for fast, secure browser-to-browser transfers and **PocketBase** as a simple backend for user management and signaling.

---

## 🚀 Features

- 🔁 Peer-to-peer file transfers (WebRTC)
- ⚡ Real-time signaling using PocketBase
- 🌐 Fully web-based, no need for external apps
- 🎨 Clean, minimal UI

---

## 📦 Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [PocketBase](https://pocketbase.io/) binary
- Provided PocketBase database file (`!!Import_me!!.json`)

---

### 🛠️ Pocketbase Setup

#### 1. Download The ZIP From [Here](https://github.com/DrPanayioths/ShareDRP/releases)

- Download the PocketBase binary for your OS:
  - [Windows](https://github.com/pocketbase/pocketbase/releases/download/v0.28.3/pocketbase_0.28.3_windows_amd64.zip)
  - [Linux](https://github.com/pocketbase/pocketbase/releases/download/v0.28.3/pocketbase_0.28.3_linux_amd64.zip)
  - [macOS](https://github.com/pocketbase/pocketbase/releases/download/v0.28.3/pocketbase_0.28.3_darwin_amd64.zip)

#### 3. Go To Pocketbase Folder, RightClick In The Free Space, Click Open In Terminal [Helpful Screenshot](https://imgur.com/2ZCsRYB)

#### 4. Run  `pocketbase.exe serve` And Hold Ctrl And Click The Dashbaord Link

#### 5. Click The Tool Icon In The Left Sidebar, Click Import Collection, Load From JSON And Select The File Provided (`!!Import_me!!.json`)

### 🌐  Website Setup (Node.js Need To Be Already Installed)

#### 1. Go The Project Folder 

### 2. Right Click And **"Open in Terminal"**   [Helpful Screenshot](https://imgur.com/WPn5Nnx) 

### 3. Run `npm install`

### 4. Run `npm run dev`
