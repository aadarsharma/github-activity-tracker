# 📦 GitHub Webhook Activity Tracker

A real-time dashboard for monitoring GitHub webhook events, built with **React**, **Vite**, and the **Firebase ecosystem**. This project demonstrates a full-stack, serverless application architecture designed for scalability and real-time data synchronization.

---

## 🚀 Live Demo & Walkthrough

- **Live Application**: [Host Link](https://github-activity-tracker-rouge.vercel.app/)
- **Loom Video Walkthrough**: [Video Link](https://www.loom.com/share/97d61349bc5e4fdcbb59834f6129e01c?sid=c1aca747-8fbd-4afe-b116-5e16010a91d9)

---

## ✨ Features

- 🔄 **Real-time Event Feed**: Events appear instantly via Firestore's real-time listeners.
- 🔐 **Webhook Backend**: A secure Firebase Cloud Function processes GitHub-style POST payloads.
- 🔍 **Dynamic Filtering**: Filter events by type (`star`, `issue`, `push`) through a responsive UI.
- ➕ **Manual Event Entry**: Add test events through a form directly into Firestore.
- 🆕 **"New" Event Animation**: Visual cue for new events with a graceful fade-out.
- 🌐 **Localized Timestamps**: Automatically formatted to the user's local timezone (e.g., IST).
- 📱 **Fully Responsive Design**: Optimized for all screen sizes with Tailwind CSS.
- 📦 **Persistent Data**: Events stored securely in Firestore.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- React
- Vite
### **Backend**
- Firebase Cloud Functions (Node.js)
### **Database**
- Firestore (NoSQL)
### **Styling**
- Tailwind CSS
### **Hosting**
- Firebase Hosting
### **Simulation**
- cURL / Postman for webhook payloads

---

## 🏗️ System Architecture

1. **Event Source**: GitHub repository (simulated using cURL) sends a webhook POST.
2. **Webhook Endpoint**: Firebase Cloud Function receives, parses, and validates the payload.
3. **Data Persistence**: Parsed event is written to Firestore.
4. **Real-Time Sync**: React client listens using `onSnapshot` and auto-updates UI.
5. **UI Update**: Event appears instantly on the dashboard.

---

## 🚀 Getting Started: Run Locally

### ✅ Prerequisites

* Node.js (v18+)
* Git
* Firebase CLI:

```bash
npm install -g firebase-tools
```

---

### 🧰 Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/aadarsharma/github-activity-tracker.git
cd github-activity-tracker
```

#### 2. Firebase Project Setup

* Create a project at [Firebase Console](https://console.firebase.google.com/)
* Enable Firestore (Test Mode)
* Register a Web App and get your `firebaseConfig`

#### 3. Configure Environment Variables

Create a file named `.env` inside `client/`:

```env
VITE_API_KEY="AIzaSyXXXXXXXXXXXXXXXXXXX"
VITE_AUTH_DOMAIN="your-project-id.firebaseapp.com"
VITE_PROJECT_ID="your-project-id"
VITE_STORAGE_BUCKET="your-project-id.appspot.com"
VITE_MESSAGING_SENDER_ID="1234567890"
VITE_APP_ID="1:1234567890:web:abcdef123456"
```

> 🔒 `.env` is git-ignored to keep keys safe.

---

#### 4. Install Dependencies

```bash
# Install backend dependencies
cd functions
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

---

#### 5. Deploy Firebase Function

```bash
firebase login
firebase use YOUR_PROJECT_ID
firebase deploy --only functions
```

Copy the function URL shown in the terminal.

---

#### 6. Run the Frontend

```bash
cd client
npm run dev
```

Your app will run at: [http://localhost:5173](http://localhost:5173)

---

## 🔪 Test the System

Use the function URL and send a cURL request:

```bash
curl -X POST YOUR_FUNCTION_URL \
-H "Content-Type: application/json" \
-d '{
  "action": "created",
  "repository": { "name": "my-test-repo" },
  "sender": { "login": "local-tester" },
  "starred_at": "2025-06-14T18:00:00Z"
}'
```

You should see the new event instantly in the UI.

---

## 🧠 Approach & Challenges

### Architectural Decisions

* **Firebase Ecosystem**: Used for seamless integration and real-time capabilities.
* **Vite**: Chosen for faster builds and smoother dev experience.
* **Component-Based Design**: Modular components like `EventItem`, `AddEventForm` improve readability.
* **Centralized State**: Maintained in `App.jsx` and derived locally per render.
* **Mobile-First Design**: Styled using Tailwind's responsive utility classes.

### Main Challenge: First-Time Firebase

* **Serverless Shift**: Deploying and debugging Cloud Functions was new.
* **Real-time Data Flow**: Understanding `onSnapshot` and how it differs from regular fetching was a key insight.
* **Debugging**: Reading logs from Google Cloud helped trace function issues.

> Overcoming these gave a strong foundation for real-time, full-stack development.

---

## 📁 Folder Structure

```
github-activity-tracker/
├── client/                 # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEventForm.jsx
│   │   │   ├── EventFilter.jsx
│   │   │   ├── EventItem.jsx
│   │   │   └── EventList.jsx
│   │   ├── App.jsx
│   │   ├── firebaseConfig.js
│   │   ├── index.css       # Tailwind CSS
│   │   └── main.jsx
│   ├── .env                # Local env variables
│   └── tailwind.config.js
├── functions/              # Firebase Function
│   ├── index.js
│   └── package.json
├── .firebaserc
├── firebase.json
├── firestore.rules
└── README.md
```
