import React, { useState, useEffect, Fragment} from 'react';
import { getCategories, list } from './apiCore'
import Card from './Card'

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false
  });

  const { categories, category, search, results, searched } = data;
  const loadCategories = () => {
    getCategories().then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        setData({...data, categories: data})
      }
    })
  }
  const searchData = () => {
    // console.log(search, category)
    if(search){
      list({search: search || undefined, category: category})
      .then(response => {
        if(response.error){
          console.log(response.error)
        } else {
          setData({...data, results: response, searched: true})
        }
      })
    }
  }
  const searchSubmit = event => {
    event.preventDefault();
    searchData();
   }
  const handleChange = (name) => event => {
    setData({...data, [name]: event.target.value, searched: false })
  }
  const searchMessage = (searched, results) => {
    if(searched && results.length > 0){
      return `Found ${results.length} products.`;
    }
    if(searched && results.length < 1){
      return `No products found.`;
    }

  }

  const searchedProducts = (results=[]) =>{

    return(
      <Fragment>

        <h2 className="my-4">
          {searchMessage(searched, results)}
        </h2>
        <div className="row">
          {results.map((product, i)=>(
            <div className="col-4 mb-3">
              <Card key={i} product={product} />
            </div>
          ))}
        </div>
      </Fragment>
    )
  }
  const searchForm = () => (
    <form action="" onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange('category')} name="" id="">
              <option value="all">All Category</option>
              {categories.map((cat,index)=>(
                <option key={index} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange('search')}
            placeholder="Search by name"
          />
          <div className="button input-group-append" style={{border:'none'}}>
            <button className="input-group-text">Search</button>
          </div>
        </div>
      </span>

    </form>
  )

  useEffect(()=>{
    loadCategories()
  },[])

  return(
    <Fragment>
      <div className="row">

        {/* {JSON.stringify(categories)}; */}
        <div className="container mb-2">
          {searchForm()}

          {/* {JSON.stringify(results)} */}

        </div>
      </div>

        {searchedProducts(results)}

    </Fragment>
  )

}

export default Search;
