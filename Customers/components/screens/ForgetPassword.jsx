import React,{useState} from 'react'
import { SafeAreaView, StyleSheet, Text, View 
    ,ImageBackground,TextInput,Alert} from 'react-native'
import { COLORS } from '../styles/Colors'
import Flatbutton from '../styles/button'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { FONTS } from '../styles/Font'
import { auth,db } from './firebase';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const ForgetPassword = () => {
    const [email,setEmail]=useState();
    const reset =async()=>{
        try{
            await auth
            .sendPasswordResetEmail(email)
            setEmail('')
        }catch(error){
            Alert.alert(error.message)
        }
    }
    return (
        <SafeAreaView>
             <ImageBackground style={styles.imageBackground} source={require('../images/hotel.jpg')}>
             <View style={styles.container}>
            <Text style={{fontFamily:FONTS.extraBold,fontWeight:'bold',fontSize:30,
        color:COLORS.theme}}>Forget Password</Text>
        {/* <Text style={{fontFamily:FONTS.Regular}}>Please Enter your password to reset your Password</Text> */}
         <KeyboardAwareScrollView
             style={styles.innerContainer}>
        <View style={styles.inputContainer}>
        <View style={styles.inputIconView}>
            <Icon name='email'
            style={{color:'#fff',textAlign:'center',
        fontSize:18}}
            />
        </View>
            <TextInput
             style={styles.inputs}
             placeholder='Enter Email'
             keyboardType='email-address'
             value={email}
             onChangeText={(e)=>(setEmail(e))}
             />
        
        </View>
       
        <View style={{marginTop:40,alignItems:'center',justifyContent:'center'}}>
            <Flatbutton text='CONTINUE' onPress={()=>reset()} />
           </View>
            </KeyboardAwareScrollView>
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    imageBackground:{
        width:'100%',
        height:'100%'
    },
    container:{
        backgroundColor:'#fff',
        padding:20,
        width:'100%',
        height:'60%',
        marginTop:220,
        borderTopRightRadius:50,
        borderTopLeftRadius:50,
        justifyContent:'center',
        alignItems:'center',
        bottom:-100
    },
    innerContainer:{
        marginTop:40,
    },
    inputs:{
        borderBottomColor:'black',
        
         flex:0.8,
        paddingLeft:10,
        fontFamily:FONTS.Regular,
    },
    inputContainer:{
        borderRadius:30,
        height:48,
        width:300,
        marginVertical:12,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
        elevation:2,
        

    },
    inputIconView:{
        width:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#4A1DD6',
        height:'100%',
        borderRadius:30,
        alignSelf:'center',
        borderTopRightRadius:0,
        borderBottomRightRadius:0,
        elevation:2,
    },

})
