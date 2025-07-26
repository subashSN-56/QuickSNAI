import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react'

import Home from './pages/Home.jsx'
import Layout from './pages/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import WriteArticle from './pages/WriteArticle.jsx'
import BlogTitles from './pages/BlogTitles.jsx'
import GenerateImages from './pages/GenerateImages.jsx'
import RemoveBackground from './pages/RemoveBackground.jsx'
import RemoveObject from './pages/RemoveObject.jsx'
import ReviewResume from './pages/ReviewResume.jsx'
import Community from './pages/Community.jsx'
import { useEffect } from 'react'
import {Toaster} from 'react-hot-toast'

function App() {
  return (
    <div>
    <Toaster />
    <Routes>
      {/* Public route */}
      <Route path='/' element={<Home />} />

      {/* Protected Routes */}
      <Route
        path='/ai/*'
        element={
          <>
            <SignedIn>
              <Layout />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl='/ai' />
            </SignedOut>
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path='write-article' element={<WriteArticle />} />
        <Route path='blog-titles' element={<BlogTitles />} />
        <Route path='generate-images' element={<GenerateImages />} />
        <Route path='remove-background' element={<RemoveBackground />} />
        <Route path='remove-object' element={<RemoveObject />} />
        <Route path='review-resume' element={<ReviewResume />} />
        <Route path='community' element={<Community />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App