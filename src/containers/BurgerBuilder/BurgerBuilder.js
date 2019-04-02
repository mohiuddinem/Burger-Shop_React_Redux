import React, {Component} from 'react'
import Aux from '../../hoc/AX';

import {connect} from 'react-redux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionType from '../../store/actions';

class BurgerBuilder extends Component {
    state={
        purchaseable:false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        console.log( this.props.ings)
        // axios.get('https://react-burger-shop-dc76e.firebaseio.com/ingredients.json')
        //     .then(response=>{
        //         this.setState({ingredients: response.data})
        //         console.log(response.data);
        //     })
        //     .catch(error=>{
        //         this.setState({error: true})
        //     })
    }

    updatePurchaseState (ingredients){
        const sum = Object.keys(ingredients).map(ingkey=>{
            return ingredients[ingkey]
        }).reduce((sum, el)=>{
            return sum + el; 
        },0);
        return sum > 0
    }

    // addIngredientHandler = (type)=>{

    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount;
    //     const priceAddition  = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice : newPrice, ingredients: updatedIngredients
    //     });

    //     this.updatePurchaseState(updatedIngredients);

    // }

    // removeIngredientHandler = (type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updateCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updateCount;
    //     const priceDeduction  = INGREDIENTS_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         totalPrice : newPrice, ingredients: updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);

    // };

    purchaseHandler = () =>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        //alert('Continue pleasee')
        
        const queryParams  = [];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);

        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString 
        })
    }


    
    render(){

        let disableInfo = {
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key]  = disableInfo[key] <= 0
        } 
        console.log("test" + this.props.ings);

        let orderSummary =  null;
        
            let burger = this.state.error ? <p>Burger Ingredients cannot be loaded</p> : <Spinner />;

            if(this.props.ings){
                burger = (
                    <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls 
                            ingridentAdded = {this.props.onIngredientAdded}
                            ingridentRemove = {this.props.onIngredientRemoved}
                            disabled = {disableInfo}
                            ordered = {this.purchaseHandler}
                            purchaseable = {this.updatePurchaseState(this.props.ings)}
                            price={this.props.price}
                        />
                    </Aux>
                );
                orderSummary = <OrderSummary 
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancalled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    />
            }
            if(this.state.loading){
                orderSummary = <Spinner />
            }
    
        

        return(
            <Aux>
                <Modal show = {this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger }
                
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onIngredientAdded: (ingName)=>dispatch({type: actionType.ADD_INGREDIENT, ingredientName:ingName}),
        onIngredientRemoved: (ingName)=>dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));