import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { AuthContextProvider } from './components/context/AuthContext.jsx';



createRoot(document.getElementById("root")!).render(
    <AuthContextProvider>
    <RouterProvider router={router}/>
    </AuthContextProvider>
);
