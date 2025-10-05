# Home Management System — Frontend

This folder contains the React frontend for the Home Management System. It was bootstrapped with Vite and leverages modern React features and libraries to provide a responsive UI for customers and service providers.

## Quick overview

- Location: `frontend/home-management-system-Frontend`
- Tooling: Vite, ESLint
- Main scripts: `dev`, `build`, `preview` (defined in `package.json`)

## 🔧 Tech stack

- React 19
- Vite
- axios for HTTP requests
- react-router-dom for routing
- framer-motion, swiper, react-icons, sonner, react-tsparticles (UI & effects)

## 🚀 Features (frontend)

- Service listings and provider search
- User authentication (login/register) UI
- Customer and provider profile pages
- Booking and review forms (consumes backend APIs)
- Responsive layout and basic accessibility considerations

## 📦 Local setup (development)

Open a PowerShell terminal and run:

```powershell
cd .\frontend\home-management-system-Frontend
npm install
npm run dev
```

This starts Vite's development server (default: http://localhost:5173). The frontend expects the backend API to be reachable at an API base URL — see "Environment configuration" below.

## ⚙️ Build for production

```powershell
cd .\frontend\home-management-system-Frontend
npm run build
npm run preview
```

`npm run build` produces a `dist/` folder you can serve with any static server or integrate into your backend server.

## Environment configuration

The frontend should be able to point to different API backends via Vite environment variables. Create a `.env` or `.env.local` file in `frontend/home-management-system-Frontend` with the following example:

```
VITE_API_BASE_URL=http://localhost:8000
```

Then in your code reference the variable with `import.meta.env.VITE_API_BASE_URL` (Vite exposes env vars prefixed with `VITE_`). For example, set axios default base URL:

```js
// ...existing code...
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
```

If you don't set this, update your existing axios or fetch calls to target the correct backend URL.

## Connecting to the backend

The backend API lives in `backend/home-management-system-Backend/api`. During local development you can run the PHP server and point the frontend to it. Example PHP built-in server command (from the backend folder):

```powershell
cd .\backend\home-management-system-Backend
php -S localhost:8000 -t api
```

Then set `VITE_API_BASE_URL=http://localhost:8000` in the frontend `.env` file so the frontend calls the correct endpoints.

Protected endpoints require a JWT. After login, the frontend should store the JWT (e.g., in a cookie or secure storage) and include it in requests via the `Authorization: Bearer <token>` header.

## Debugging & troubleshooting

- CORS errors: If the browser blocks calls from the dev server to the PHP server, add permissive CORS headers to the backend during development (see main README):

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
```

- 404s or wrong endpoints: confirm `VITE_API_BASE_URL` and endpoint paths match the backend filenames (e.g., `login.php`, `register.php`).
- Dependency issues: delete `node_modules` and `package-lock.json`, then run `npm install`.
- Port conflicts: Vite will suggest a new port if 5173 is occupied. To force a port use `npm run dev -- --port 5173` or set `PORT` env var.

## Recommended next steps

- Add a `.env.example` with `VITE_API_BASE_URL` so teammates know what to configure.
- Make sure axios uses the env var for base URL and centralize API calls in a service module.

## Where to find other docs

- Backend API documentation: `backend/home-management-system-Backend/documentation/api.md`
- Backend JWT notes: `backend/home-management-system-Backend/documentation/jwt.md`

---

If you want, I can add a `.env.example` file and update the axios config to use `import.meta.env.VITE_API_BASE_URL`. Would you like me to make those changes?

## Full-stack quickstart (if you're viewing only the frontend)

If you cloned the repository and landed in the frontend folder, follow these steps to run the complete application (frontend + backend):

1. Start the backend:

```powershell
cd ..\..\backend\home-management-system-Backend
composer install
php -S localhost:8000 -t api
```

2. Start the frontend in a new terminal:

```powershell
cd ..\frontend\home-management-system-Frontend
npm install
npm run dev
```

3. Open the frontend at `http://localhost:5173` and ensure `VITE_API_BASE_URL` is set to `http://localhost:8000` in a local `.env` (or use the default fallback). The frontend will then communicate with the locally running PHP API.

## Where the other repo/folder is

From the frontend folder the backend is located at: `..\..\backend\home-management-system-Backend`.
If you're browsing a single folder on GitHub, look for the sibling folder named `backend/home-management-system-Backend` in the parent repository to find the backend code and documentation.
