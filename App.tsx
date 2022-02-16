import React from 'react';
import { StatusBar } from 'react-native';


import { Home } from './src/screens/home';
import { Search } from './src/screens/search/search';


export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" />
    
      <Home/>
    </>
  )
}