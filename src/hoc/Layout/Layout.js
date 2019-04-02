import React, {Component} from 'react';
import Aux from '../AX';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'



class Layout extends Component{
    state={
            showSideDrawer: false
        }
    
    
    sideDrawerClosedHandler  = ()=>{
        this.setState({showSideDrawer: false})
    }
    sideDrawerToggleHandler = ()=>{
        this.setState((prevState)=>{
            return{showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render () {
        return(
            <Aux>
                <Toolbar DrawerToggleClicked={this.sideDrawerToggleHandler}/>
                <Sidedrawer 
                    open={this.state.showSideDrawer} 
                    clossed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

export default Layout