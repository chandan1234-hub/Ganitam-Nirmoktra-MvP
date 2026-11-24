# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Authenticated chat setup

Set `VITE_CLERK_PUBLISHABLE_KEY` for the frontend and `CLERK_SECRET_KEY` for the backend. The backend also needs its existing `MONGODB_URI`. The chat uses `/api/user/sync` and `/api/user/usage` by default; override them with `VITE_USER_SYNC_ENDPOINT` and `VITE_USER_USAGE_ENDPOINT` when deploying to a different API layout. Configure `VITE_API_URL` when the API is hosted on another origin.

Solver, chat-history, OCR, and user routes require a Clerk bearer token. The usage display uses the Free plan's five-chat count shown on the plans page.
