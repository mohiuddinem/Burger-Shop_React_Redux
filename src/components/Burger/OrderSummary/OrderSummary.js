import React, {Component} from 'react'
import Aux from '../../../hoc/AX';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary,  will mount]')
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingkey=>{
            return (

                <li key ={ingkey} style={{listStyle:"none",marginLeft:"15px"}}>

                    <span style={{textTransform:'capitalize'}}>{ingkey}</span>:{this.props.ingredients[ingkey]}
                </li>

            )
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicias burger with following ingredients:</p>
                <ul>{ingredientSummary}</ul>
                <p>Total Price : {this.props.price.toFixed(2)}</p>
                <p>Continiue to check out?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancalled} >Cancel</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue} >Continue</Button>
            </Aux>
        )

    }
}

export default OrderSummary
