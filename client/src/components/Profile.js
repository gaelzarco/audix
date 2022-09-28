import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import LoadingSpinner from '../loading/LoadingSpinner';
import Error from './Error';
import LandingPage from "./LandingPage";

export default function Profile() {
    
    return (
        <>
        <Suspense fallback={<LoadingSpinner />} />
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route path='error/:error' element={<Error />} />
            </Routes>
        <Suspense />
        </>
    )
}