import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Error from './Error';
import User from "./User";

import LoadingSpinner from '../loading/LoadingSpinner';

export default function Profile() {
    return (
        <>
        <NavBar />
        <Suspense fallback={<LoadingSpinner />} />
            <Routes>
                <Route path='/' element={<User />}/>
                <Route path='error/:error' element={<Error />} />
            </Routes>
        <Suspense />
        </>
    )
}