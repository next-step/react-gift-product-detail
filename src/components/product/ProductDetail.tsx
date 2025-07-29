import React from 'react'
import { Padding2, Padding4 } from '../common/Padding';
import type { Announcement } from '@/services/productApi';

type Props= {
announcements:Announcement[]
}
const ProductDetail = ({announcements}:Props) => {
  return ( <div>
    {announcements.map((item)=> <div
    key={item.displayOrder}>
        <Padding4 />
        <p>{item.name}</p>
        <Padding2 />
        <p>{item.value}</p>
      </div>)}
   
      
    </div>
  );
}

export default ProductDetail
