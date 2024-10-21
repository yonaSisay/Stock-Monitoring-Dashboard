import React from 'react';
import StockList from './components/StockList';
import './App.scss';
import MainLayout from './layouts/app';

const App = () => (
  <MainLayout>
    <StockList />
  </MainLayout>
);

export default App;
