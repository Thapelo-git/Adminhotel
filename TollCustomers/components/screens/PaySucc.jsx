import { StyleSheet, Text, View ,Button,SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { StatusBar } from 'expo-status-bar';

const PaySucc = ({navigation}) => {
  return (
    <SafeAreaView>
    <StatusBar
   backgroundColor="#0225A1"
   barStyle="light-content"
   />
<View style={styles.container}>
   
   <LottieView style={styles.hotel}
source={require('../onbording/animation2.json')} autoPlay loop/>
  
 </View>
 <TouchableOpacity style={{ marginTop:250,justifyContent:'center',alignItems:'center',borderRadius:10,
        marginLeft:130,backgroundColor:'#4A1DD6',width:120,height:50}} onPress={()=>navigation.navigate('HomeTap')}>
       <Text style={{color:'#fff'}}>OK</Text>
   </TouchableOpacity>
                {/* <Button style={{width:100}}
                       title='Add Card'
                       onPress={()=>navigation.navigate('HomeTap')}/> */}
</SafeAreaView>
  )
}

export default PaySucc

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding:80,
        marginTop:100,
        marginLeft:-150
      },
      hotel: {
        width:300,
        height:300,
        
      },
})