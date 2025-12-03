# 🌟 Simple POC

A functional proof-of-concept (POC) demonstrating a minimal Customer Portal using **Next.js**, **Express.js**, and integration with a real **ServiceM8 API** endpoint. This project evaluates independent interpretation of requirements, reasonable assumptions, and delivering working functionality within a limited timeframe.

---

## 🎯 Objective & Implemented Features

This project demonstrates competence in architecture, integration, and modern web development practices.

**Functional Requirements Met:**

- ✅ User Authentication  
- ✅ Data Retrieval  
- ✅ ServiceM8 API Endpoint Integration  

---

## 🛠️ Technical Stack

**Frontend:**  
- **Next.js (React)** – UI, routing, client-side data fetching, and optional server components.  

**Backend:**  
- **Express.js** – API middleware (BFF), external API proxy, and secure data handling.  

**Integration:**  
- **ServiceM8 API**  

**Styling:**  
- **Tailwind CSS** – Utility-first approach for responsive, fast development.  

**Persistence:**  
- **Local JSON** – Simple storage for user messages and mock data.  

---

## 🏗️ Project Structure & Architecture

The solution uses a **Backend for Frontend (BFF)** pattern with a **Controller-Service** architecture for separation of concerns.

client/ → Next.js application (UI & user interactions)
server/ → Express.js API (secure proxy)
├─ controllers/ → Handle HTTP request/response flow
├─ services/ → Business logic (ServiceM8 integration, data handling)
└─ routes/ → API endpoint definitions

---

## 💡 Architectural Decisions & Trade-offs

1. Controller-Service Abstraction

Decision: All business logic placed in server/services/servicem8.js, separate from controllers.

Rationale: Keeps controller logic clean, makes business logic testable and reusable, and encapsulates external API and persistence complexities.

2. Data Persistence Method

Decision: Single db.json file for local storage.

Trade-off: Not production-ready. In a real app, a robust database (PostgreSQL, Firebase) would handle concurrent writes and relational data.

3. Authentication Approach

Decision: Mock login system via server/routes/auth.js and server/middleware/auth.js.

Rationale: Focuses on functional requirements (ServiceM8 integration & portal features) without time-consuming security setup. Token verification is mocked for route protection.

---

## ⚙️ Setup & Installation

**Prerequisites:**  
- Node.js v18+  
- npm  

**1. Configuration (Environment Variables):**  
- Create `.env` files in both `client/` and `server/` directories.  
- Ensure the client points to the running Express server, e.g., `http://localhost:5000/api`.  

**2. Install Dependencies:**  
```bash
# Backend
cd server
npm install

# Frontend
cd client
npm install

# Start Backend
cd server
npm run dev
# Server runs on http://localhost:5000

# Start Frontend
cd client
npm run dev
# Client runs on http://localhost:3000

