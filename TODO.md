# TODO: Implement InvestMate Features

## Information Gathered
- **Login Page**: Already exists in `frontend/src/pages/Login.js`, but needs token storage fix (done).
- **Glossary**: Page exists in `frontend/src/pages/Glossary.js`, needs content and styling.
- **Videos**: Page exists in `frontend/src/pages/Videos.js`, needs content and styling.
- **Stock Calculator**: Exists in `frontend/src/pages/DynamicInvestmentCalculator.jsx`, seems functional but needs backend integration.
- **Live Graphs**: Component exists in `frontend/src/components/LiveGraphs.jsx`, needs integration.
- **Portfolio**: Dashboard exists in `frontend/src/pages/PortfolioDashboard.jsx`, backend routes exist, needs full integration.
- **Backend**: Server setup in `backend/server.js`, auth routes, portfolio routes, stock routes exist.
- **Frontend**: App.js has routing, axios configured, but some imports missing (e.g., PortfolioDashboard in App.js).

## Plan
- [x] Fix login to store token in localStorage (done).
- [x] Update App.js to import PortfolioDashboard correctly (done).
- [x] Fix Navbar.js typo (done).
- [x] Enhance Glossary page with content and styling (already has content).
- [x] Enhance Videos page with content and styling (already has videos).
- [x] Integrate LiveGraphs component into Home page properly (done).
- [x] Ensure Stock Calculator backend integration (updated routes).
- [ ] Test Portfolio functionality end-to-end.
- [ ] Add authentication guards to protected routes.

## Dependent Files to be edited
- `frontend/src/App.js`: Fix imports and routing.
- `frontend/src/pages/Glossary.js`: Add content.
- `frontend/src/pages/Videos.js`: Add content.
- `frontend/src/pages/Home.js`: Integrate LiveGraphs.
- `backend/routes/stock.js`: Add search endpoint for stock calculator.
- `frontend/src/components/LiveGraphs.jsx`: Ensure it works.

## Followup steps
- [ ] Start backend server.
- [ ] Start frontend server.
- [ ] Test login flow.
- [ ] Test each feature.
- [ ] Ensure all routes are protected where needed.
