import React, { useState } from 'react';
import { Beer } from '../../types/types'
import axios from 'axios'

const BeerList = () => {
  const [beerList, setBeerList] = useState<Beer[]>([]);
  const getBeerList = () => {
    axios.get('https://api.punkapi.com/v2/beers/?per_page=8')
      .then(answerApiBeer => setBeerList(answerApiBeer.data))
  }

  return (
    <div className="food-beer-list food-shop">
      <h1>Beers</h1>
      <button onClick={() => getBeerList()}>Search Beer</button>
      <div className="beers-list">

          {
              beerList.map((item: Beer) => {
                return (
                  <div className="beer">
                    <img src={item.image_url} alt="Buzz" />
                    <h3>{item.name}</h3>
                    <span>{item.tagline}</span>
                    <small>{item.description}</small>
                  </div>
                )
              })
            }
      </div>
    </div>
  );
}

export default BeerList;