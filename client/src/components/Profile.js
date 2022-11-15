import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";

import User from "./User";
import TopArtists from "./TopArtists";
import Artist from "./Artist";
import TopTracks from "./TopTracks";
import Recent from "./Recent"
import Static from "./STATIC";

import LoadingSpinner from '../loading/LoadingSpinner';

export default function Profile() {
    return (
        <>
        <NavBar />
        <Suspense fallback={<LoadingSpinner />} />
            <Routes>
                <Route path='/' element={<User />}/>
                <Route path='/artists' element={<TopArtists />} />
                <Route path='/artist/:id' element={<Artist />} />
                <Route path='/tracks' element={<TopTracks />} />
                <Route path='/recent' element={<Recent />} />
                <Route path='/STATIC' element={<Static />} />
            </Routes>
        <Suspense />
        </>
    )
}