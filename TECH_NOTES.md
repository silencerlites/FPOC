## Project: Simple POC – Full-Stack Customer Portal

This document outlines technical decisions, implementation details, assumptions, and potential improvements for the project.

---

## 1️⃣ What Was Built

- A **proof-of-concept Customer Portal** demonstrating:
  - User authentication (mock login system)
  - Data retrieval and display
  - Integration with **ServiceM8 API** (single endpoint)
- Full-stack architecture using:
  - **Frontend:** Next.js + Tailwind CSS
  - **Backend:** Express.js
  - **Persistence:** Local JSON (`db.json`)
  - **Integration:** ServiceM8 API

---

## 2️⃣ Reasoning Behind the Approach

- **BFF Pattern (Backend-for-Frontend):**
  - Keeps external API keys and logic secure on the server.
  - Simplifies frontend API calls (frontend only calls internal Express endpoints).
  
- **Controller-Service Separation:**
  - Controller handles HTTP request/response.
  - Service layer handles business logic, API integration, and persistence.
  - Improves testability and maintainability.

- **Local JSON Storage:**
  - Quick implementation for POC.
  - Enables persistence without complex database setup.

- **Mock Authentication:**
  - Prioritized functional POC features over full security implementation.
  - Token verification is simulated in middleware to protect routes.

---

## 3️⃣ Assumptions Made

- ServiceM8 API credentials are valid and accessible from the backend.  
- Single-user or small-scale testing, hence using local JSON for persistence is sufficient.  
- Authentication is mocked; production-ready security is out of scope.  
- The portal focuses on demonstrating **integration and architecture**, not full-scale enterprise features.  

---

## 4️⃣ Potential Improvements

- Replace **local JSON** with a **database** (PostgreSQL, MongoDB, Firebase) for scalability.  
- Implement **real authentication** (JWT, OAuth2).  
- Add **unit and integration tests** for backend and frontend.  
- Enhance **error handling** and **logging**.  
- Expand **ServiceM8 integration** to multiple endpoints and dynamic actions.  
- Improve **UI/UX** with better design and accessibility.  

---

## 5️⃣ How AI Assisted the Workflow

- Suggested **architecture and project structure** for clarity and maintainability.  
- Generated **boilerplate code** for Express.js controllers and Next.js pages.  
- Reviewed **code consistency and best practices**, especially for API handling.  
- Drafted **documentation and README**, ensuring professional presentation.  

---

## 6️⃣ Setup Notes

- Environment variables required for backend API endpoints.  
- Frontend points to backend via `http://localhost:5000/api` (default).  
- Install dependencies separately for client and server before running.  
- Run backend first, then frontend.