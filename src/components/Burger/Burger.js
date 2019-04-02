import React from 'react'
// import {withRouter} from 'react-router-dom';
import Classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const Burger = (props)=> {

    console.log(props.ingredients)

    let transformIngredients = Object.keys(props.ingredients).map(ingkey=>{
            return [...Array(props.ingredients[ingkey])].map((_, i)=>{
                return <BurgerIngredient key={ingkey + i} type={ingkey} />
            });
        }).reduce((arr, el)=>{
            return arr.concat(el)
        },[])
        
        if(transformIngredients.length === 0){
            transformIngredients = <p>Please add ingridients</p>
        }

    return (
        <div className={Classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    )
}



export default Burger;