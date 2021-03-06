import React,{useState,useEffect} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,FlatList,Image} from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import colors from '../constants/colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BottomTabComponent from '../components/BottomTabComponent'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch,useSelector } from 'react-redux'
import wishListAction from '../store/actions/wishList'




const WishListScreen = ({navigation,route}) => {


    const dispatch = useDispatch()

    const wishListProds = useSelector(state => state.WishList) 
   

    useEffect(() => {

    const getWishListHotel = async() => {
    
        let wishListDataFromAsync = await AsyncStorage.getItem('wishList')
        let wishListData = JSON.parse(wishListDataFromAsync)

        if(wishListData == null){

            AsyncStorage.setItem('wishList', JSON.stringify([]))
            dispatch(wishListAction.addToWishList([]))

        }else {

            AsyncStorage.setItem('wishList',JSON.stringify(wishListData))
            dispatch(wishListAction.addToWishList(wishListData))


        }

      

    }

    getWishListHotel()



    },[route])


return(

    <SafeAreaView style = {styles.container}>

        <HeaderComponent navigation={navigation} title = 'Wish List' icon = 'back' parentScreenName={'HomeScreen'} />


        <View style = {styles.content}>

        {wishListProds ?. length > 0 ?

        <FlatList
        data = {wishListProds}
        
        renderItem = {({item,index}) => {
            return(

            <TouchableOpacity key = {index} onPress={() => {navigation.navigate('DetailScreen', {hotel: item})}} style = {styles.cardContainer}>

            <View style = {{width:'40%'}}>

                <Image style = {{width:'100%',height:'100%',borderRadius:10,}} source= {item.img}/>


            </View>


            <View style = {{flex:1,paddingLeft:15,bottom:8}}>

                <Text style = {styles.hotelNameTxt}>{item.name}</Text>

                <View style = {styles.locationContainer}>

                    <Icon name='place' size={25} color= '#033640' />

                    <Text style = {styles.countryTxt}>{item.country}</Text>

                </View>

                <View style = {styles.rateContainer}>

                    <Icon name = 'star' size={25} color= '#f5a623'/>

                    <Text style = {styles.rateTxt}>{item.rate}</Text>

                </View>
                
                <View style = {styles.priceContainer}>

                    <Text style = {styles.priceTxt}>${item.price}/</Text>

                    <Text style = {styles.perNightTxt}>{item.pernight}</Text>

                </View>
                
            </View>

            
            <TouchableOpacity onPress={() => {navigation.navigate('BookingScreen')}} style = {styles.bookNowView}>

                <Text style = {{color:colors.primary,fontSize:15,fontWeight:'bold'}}>Book Now</Text>
                
            </TouchableOpacity>        



            </TouchableOpacity> 

            )

        }}

            keyExtractor = {(item,index) => index.toString()}
        />

        :

        <View style = {{flex:1,justifyContent:'center', alignItems:'center'}}>

        <View style = {{width:150,height:150}}>

            <Image style = {{width:'100%', height:'100%'}} source = {require('../../assets/seee-dog.webp')}/>

        </View>

        <Text style = {{fontSize:16, fontWeight:'bold', color:colors.txt, marginTop:10}}>There is no wish list data.</Text>


    </View>
    
        }

        </View>

        <BottomTabComponent navigation = {navigation} screenName = 'WishList'/>
    </SafeAreaView>
)
}

export default WishListScreen;

const styles = StyleSheet.create({
    
    container :  {flex:1},

    content :  {flex:1,backgroundColor:colors.white},

    cardContainer : {flexDirection:'row',alignItems:'center',backgroundColor:'#f0fffe',height:170,padding:10,marginTop:10,marginLeft:10,marginRight:10,borderRadius:10},

    hotelNameTxt : {fontSize:18,fontWeight:'bold'},

    countryTxt : {fontSize:15, color:colors.primary},

    rateTxt : {fontSize:15,color:colors.primary,fontWeight:'bold'},

    priceTxt : {fontSize:18,fontWeight:'bold'},

    perNightTxt : {fontSize:13,},

    locationContainer : {flexDirection:'row', alignItems:'center',marginTop:5},

    rateContainer: {flexDirection:'row',alignItems:'center',marginTop:5},

    priceContainer: {flexDirection:'row',alignItems:'center',marginTop:5},

    bookNowView : {backgroundColor:colors.homeBg,position:'absolute',right:0,bottom:0,
                   padding:10,borderTopLeftRadius:10,borderBottomRightRadius:10,
                   shadowColor:'#000',elevation:30,}





})