import React from 'react'

export default function Items({drugs}) {
  console.log('Items = ', drugs)
  
  return (
    <div className='itemList'>
      {
        drugs.map((drug, key) => {
          return (
            <div className='item' key={key}>
              <div className='text'>
                <h2>{drug.itemName}의 제품정보</h2>
                <ul>
                  <li>제품명: {drug.itemName}</li>
                  <li>제조사: {drug.entpName}</li>
                  <li>효능: {drug.efcyQesitm.replace(/<(\/p|p)([^>]*)>/gi,"")}</li>
                  <li>용법: {drug.useMethodQesitm.replace(/<(\/sup|sup)([^>]*)>/gi,"").replace(/<(\/sub|sub)([^>]*)>/gi,"").replace(/<(\/p|p)([^>]*)>/gi,"")}</li>
                  <li>주의사항: {drug.atpnQesitm}</li>
                  <li>보관방법: {drug.depositMethodQesitm}</li>
                </ul>
                
              </div>
            </div>
          )
        })
      }
    </div>
  )
}
