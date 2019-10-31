import React, {useState, useEffect} from 'react';

const Checkbox = ({categories, handleFilters}) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = c => () => {

    // return the first index or -1
    const currentCategoryId = checked.indexOf(c);

    const newCheckedCategoryId = [...checked]; // eveything in the state
    //if currently checked was not already in state then we will push
    //else pull / take off

    if(currentCategoryId == -1){
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }

    console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId)

  }

  return categories.map( (c,i)=>(
    <li key={i} className="list-unstyled">
      <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input"/>
      <label htmlFor="" className="form-check-label">{c.name}</label>
    </li>
  ))
}
export default Checkbox;
