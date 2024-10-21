import React from 'react';
import './index.scss';
import { Icon } from '@iconify/react/dist/iconify.js';

const StockItem = ({ stock }) => {
  const { symbol, name, price, change, volume } = stock;

  const changeClass = 
    change > 5 ? 'significant' : 
    change < -5 ? 'negative' : '';

  return (
    <tr className="stock-item">
      <td>{symbol}</td>
      <td>{name}</td>
      <td className={`stock-item ${changeClass}`}>${price.toFixed(2)}</td>
      <td className={`stock-item ${changeClass}`}>
        
        {change}%

        {
          change > 0 ? 
            <Icon icon="iconamoon:trend-up-light" width="1.2rem"/>
           :
          change < 0 ?
           <Icon icon="iconamoon:trend-down-light" /> 
            :
            ""
        }

        
        </td>
      <td>{volume.toLocaleString()}</td>
    </tr>
  );
};

export default StockItem;
