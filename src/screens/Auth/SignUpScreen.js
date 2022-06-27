import { SafeAreaView,StyleSheet, Text, View, Image ,TouchableOpacity,ToastAndroid} from 'react-native'
import React,{useState,useEffect} from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import {Input} from 'react-native-elements'
import colors from '../../constants/colors'
import {LinearGradient} from 'expo-linear-gradient'
import { auth } from './firebase/firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const SignUpScreen = ({navigation,route}) => {

    const [name,   setName]     = useState('')
    const [email,  setEmail]    = useState('')
    const [pass,   setPass]     = useState('')
    const [rePass, setRePass]   = useState('')

    const [isSecurePassword, setIsSecurePassword] = useState(true)
    const [isSecureRePassword, setIsSecureRePassword] = useState(true)


     const successRegister = () => {

      ToastAndroid.showWithGravityAndOffset(

        
        "Sign up SuccessFul!",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,

        25,
        50

      )
    
    }

    const unsuccessRegister = () => {

    

      ToastAndroid.showWithGravityAndOffset(

      
        "Sorry, Register Unsuccessful!!",

        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        
        25,
        50

      )

    

    


    }


    const handleSignUp = () => {

      if(name != '' && email != '' && pass != '' && rePass != ''){

      auth.createUserWithEmailAndPassword(email,pass)
      .then(credentials => {

        const user = credentials.user
        
        console.log('Sign up with.....' , user.email)

        successRegister()

        navigation.navigate('LoginScreen')

      })

      .catch((error) => {console.log('Sign up error....', error)})

    }else {

      
      unsuccessRegister()


    }

      
    }


     



  return (

    <SafeAreaView style = {styles.container}>

    <View style = {styles.content}>
    
      <View style = {styles.titleContainer}>

        <Text style = {styles.titleTxt}>Create an account</Text>

        <Image style = {{width:'100%', height :'100%'}} source = {require('../../../assets/croprecep.png')} />

      </View>

      <LinearGradient colors={['#bf80ff','#e8d1ff', '#cf9eff',]} start = {{x : 0,y : 0}} end = {{x:0,y:1}} style = {styles.gradientContainer}>


      <Input

        inputContainerStyle = {styles.inputStyle}

        
        placeholder = 'Full Name'

        value = {name}

        onChangeText = {text => setName(text)}

        rightIcon = {<Image style = {{width:25,height:25}} source = {require('../../../assets/Icons/loginname.png')}/>}
      
      />

       <Input

        inputContainerStyle = {styles.inputStyle}

        placeholder = 'Email'

        keyboardType='email-address'

        value = {email}

        onChangeText = {text => setEmail(text)}

        rightIcon = {<Image style = {{width:25,height:25}} source = {require('../../../assets/logemail.png')}/>}
      
      />

       <Input

        inputContainerStyle = {styles.inputStyle}

        placeholder = 'Password'

        value = {pass}

        secureTextEntry = {isSecurePassword}

        onChangeText = {text => setPass(text)}

        rightIcon = {

          isSecurePassword ?

          <TouchableOpacity onPress={() => setIsSecurePassword(false)}>
          
              <Image style = {{width:25,height:25}} source = {require('../../../assets/Icons/hidden.png')} />

          </TouchableOpacity>
  
          :

          <TouchableOpacity onPress={() => setIsSecurePassword(true)}>

              <Image style = {{width:25,height:25}} source = {require('../../../assets/Icons/eye.png')}/>

          </TouchableOpacity>
          
        }
      
      />

       <Input

        inputContainerStyle = {styles.inputStyle}

        placeholder = 'Password Again'

        value = {rePass}

        secureTextEntry = {isSecureRePassword}

        onChangeText = {text => setRePass(text)}

        rightIcon = {

          isSecureRePassword ?

          <TouchableOpacity onPress={() => setIsSecureRePassword(false)}>
          
              <Image style = {{width:25,height:25}} source = {require('../../../assets/Icons/hidden.png')} />

          </TouchableOpacity>
  
          :

          <TouchableOpacity onPress={() => setIsSecureRePassword(true)}>

              <Image style = {{width:25,height:25}} source = {require('../../../assets/Icons/eye.png')}/>

          </TouchableOpacity>
          
      }
      
      
      />

      <TouchableOpacity onPress={() => handleSignUp()} style = {styles.signupBtnContainer}>


        <Text style = {styles.signupTxt}>Sign Up</Text>


      </TouchableOpacity>

    </LinearGradient>

    </View>
    </SafeAreaView>
  )
}

export default SignUpScreen;

const styles = StyleSheet.create({

    container : {flex:1},

    content : {flex:1,backgroundColor:colors.white},

    titleContainer : {flex:0.5,marginTop:40,alignItems:'center'},

    titleTxt : {fontSize:20,fontWeight:'bold',color:'#bf80ff',textShadowColor:'#ff00dd',textShadowRadius:3},

    inputStyle : {borderWidth:1,borderColor:'#ff00dd',borderRadius:10,marginLeft:20,marginRight:20,paddingLeft:15,paddingRight:15,backgroundColor:colors.white,shadowColor:'#ff00dd',elevation:10,shadowRadius:30},

    gradientContainer : {flex:1,borderTopLeftRadius:30,borderTopRightRadius:30,justifyContent:'center'},

    signupBtnContainer : {borderWidth:1,padding:10,backgroundColor:'#600487',borderRadius:10,marginLeft:30,marginRight:30,justifyContent:'center',alignItems:'center'},

    signupTxt : {fontWeight:'bold',fontSize:18,color:colors.white}
})