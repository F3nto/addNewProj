import React from "react";
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer'
import DrawerNavigator from "./DrawerNavigator";

import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";
import BookingScreen from "../screens/BookingScreen";
import WishListScreen from "../screens/WishListScreen";


const stack = createNativeStackNavigator()
const drawer = createDrawerNavigator()

const CustomDrawerContent = props => {
    return(

        <DrawerContentScrollView {...props}>

            <DrawerNavigator navigation={props.navigation}/>


        </DrawerContentScrollView>



    )
}





const MainNavigator = () => {
    return(

        <NavigationContainer>
            <drawer.Navigator drawerContent={props => CustomDrawerContent(props)} screenOptions={{headerShown:false}}>

                <drawer.Screen name = 'HomeScreen'    component={HomeScreen}/>
                <drawer.Screen name = 'DetailScreen'  component={DetailScreen}/>
                <drawer.Screen name = 'BookingScreen' component={BookingScreen}/>
                <drawer.Screen name = 'WishListScreen' component={WishListScreen}/>

            </drawer.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator;