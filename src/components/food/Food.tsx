import React, { useEffect, useState} from 'react';
import axios from 'axios'
import { Category, Meal } from '../../types/types'

const Foods = () => {

  const [categoryList, setCategoryList] = useState<Category[]>([])

  const [meals, setMeals] = useState<Meal[]>([])

  const [searchTerm, setSearchTerm] = useState<string>('')

  const getCategoryList = () => {
    axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(ApiCategoryListResponse => setCategoryList(ApiCategoryListResponse.data.categories))
  }

  useEffect(() => {
    getCategoryList()
  }, [])

  useEffect(() => {
    //só busco se tiver categoria selecionada
    if (searchTerm !== '') {
      axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`)
      .then(ApiSelectedID => setMeals(ApiSelectedID.data.meals))
    }
  },[searchTerm])

  useEffect(() => {
    if (searchTerm !== '') {
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
      .then(ApiSelectedID => setMeals(ApiSelectedID.data.meals))
    }
  },[searchTerm])

  return (
    <div className="food-beer-list food-shop">

      <h1>Dishes</h1>
      <p>
        Select your category or type a food:
        <input type="text" placeholder="Type your food..." onChange={(event) => setSearchTerm(event.target.value)  }/>
      </p>
      <ul>
        {

          categoryList.map((item) => {
            return (
                <li key={item.idCategory} onClick={() => {setSearchTerm(item.strCategory)} }>{item.strCategory}</li>
            )
          })
        }
      </ul>

      <h2>Selected Dish: <strong>{searchTerm}</strong></h2>

      <div className="food-container">
            {
              meals?.map((item: Meal) => {
                return (
                  <div className="food-item" key={item.idMeal}>
                    <img src={item.strMealThumb} alt={item.strMeal}/>
                    <p>{item.strMeal}</p>
                  </div>
                )
              })
            }
      </div>
    </div>
  );
}

export default Foods;