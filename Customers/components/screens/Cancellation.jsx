import React ,{useState}from 'react'
import { StyleSheet, Text, View ,Animated,TouchableOpacity,Dimensions} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import Flatbutton from "../styles/button"
const screenWidth = Dimensions.get("screen").width;
const Cancellation = ({onCancel,animation}) => {
      return(
          <Animated.View style={{
            width:screenWidth,
      
            backgroundColor:'#fff',
            borderTopLeftRadius:30,borderTopRightRadius:30,padding:20,
            position:'absolute',
            zIndex:3,alignItems:'center',justifyContent:'center',
            maxHeight:3000,shadowColor:'#000',shadowOffset:{width:0,height:12},shadowOpacity:0.50,shadowRadius:16.80,
            bottom:animation,elevation:24, 
          }}>
            
              <TouchableOpacity onPress={()=>onCancel()}>
                <View style={{
                  flexDirection:'row',alignItems:'center',justifyContent:"space-between"}}>
                    <Text></Text>
                  <Feather name='x' size={30}/>
                </View>
              </TouchableOpacity>
              <View>
                  <Text style={{fontSize:30,paddingVertical:30}}>Cancellation Policy</Text>
              <Text>No charge if cancelled day before arrival.
                   Penalty charge for late cancellation 
                   is R100 per night</Text>    
              </View>
              <Flatbutton text='Continue'
               onPress={()=>
                navigation.navigate('CheckAvailability')}/>
            
          </Animated.View>
        )
      
}

export default Cancellation

const styles = StyleSheet.create({})
