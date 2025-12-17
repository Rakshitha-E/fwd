<!-- Guidance for AI coding agents working on this repository -->
# Copilot / AI agent instructions — Investmate

This file gives targeted, actionable information to help an AI agent become productive quickly.

- **Architecture (big picture)**
  - Two-piece monorepo: `backend/` (Node + Express + Mongoose) and `frontend/` (Create React App + Tailwind).
  - Backend exposes REST auth endpoints under `/api` (see `backend/routes/authRoutes.js`).
  - Frontend is a CRA app in `frontend/` serving routes from `src/App.js`. Some older/duplicate files exist (e.g. `src/api.js`) — prefer `src/App.js` as the entry.

- **Key files to read first**
  - Backend: `backend/server.js`, `backend/routes/authRoutes.js`, `backend/models/User.js`.
  - Frontend: `frontend/src/App.js`, `frontend/src/pages/*` (Login/Register/Home/etc.), `frontend/src/axios.js` (axios instance), `frontend/src/index.js`.
  - Config: `frontend/tailwind.config.js`, `frontend/postcss.config.js`.

- **Dev & run workflows**
  - Start backend (development, auto-reload):
    - `cd backend && npm install` then `npm run dev` (uses `nodemon`) or `npm start` for plain node.
  - Start frontend (CRA):
    - `cd frontend && npm install` then `npm start` (opens at `http://localhost:3000`).
  - Default ports: frontend 3000 (CRA), backend 5000 (see `frontend/src/axios.js` and `frontend/src/pages/Login.js` which call `http://localhost:5000`).
  - Environment: backend expects `MONGO_URI` and `JWT_SECRET` in a `.env` file (see `backend/server.js`).

- **API surface & conventions**
  - Auth endpoints: `POST /api/register` and `POST /api/login` (implemented in `backend/routes/authRoutes.js`).
  - Backend uses ES modules (`type: "module"` in `backend/package.json`) — use `import`/`export default`.
  - The login response returns `{ success, token, user }`. Frontend stores/consumes tokens inconsistently — some pages call the hardcoded `http://localhost:5000` URL directly (e.g. `frontend/src/pages/Login.js`) while `frontend/src/axios.js` centralizes `baseURL: http://localhost:5000`.
  - When adding new endpoints, mount them under `/api` in `backend/server.js` to match frontend expectations.

- **Project-specific patterns & gotchas**
  - Duplicate/legacy files: `frontend/src/api.js` duplicates App-like routing. Prefer `frontend/src/App.js` and `frontend/src/index.js` as the canonical entry.
  - Styling is Tailwind-based (see `tailwind.config.js`). If adding styles, update `content` globs accordingly.
  - DB model simplicity: `backend/models/User.js` is minimal; password hashing is handled in the route with `bcryptjs`.
  - JWT tokens expire in 1 hour (`authRoutes.js`) — refresh flows are not implemented.

- **Testing & debugging tips**
  - Backend logs MongoDB connection and server start to console; reproduce issues by checking `MONGO_URI` and running `npm run dev`.
  - Use Postman or curl to exercise `/api/register` and `/api/login` directly (backend runs on port 5000).

- **When modifying code**
  - Keep module style consistent: backend must use ES module syntax. Avoid switching to CommonJS there.
  - Update `frontend/src/axios.js` when changing backend port or base path — many files still hardcode `localhost:5000`.
  - Prefer adding new React pages under `frontend/src/pages` and registering routes in `frontend/src/App.js`.

- **Integrations & external dependencies**
  - MongoDB (via `mongoose`) — ensure `MONGO_URI` points to a running Mongo instance.
  - Auth uses `bcryptjs` and `jsonwebtoken`.
  - Frontend uses `axios`, `react-router-dom`, `recharts` and `tailwindcss`.

If anything here is unclear or you'd like the instructions expanded (example PRs, test commands, or token-storage conventions), tell me which area to expand and I'll iterate.
