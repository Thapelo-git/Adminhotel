import { View, Text ,Dimensions, SafeAreaView,Image,StyleSheet} from 'react-native'
import React from 'react'
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const {height} = Dimensions.get('window')
const imgContainerHeight = screenHeight * 0.4;
const sub = imgContainerHeight * 0.2;

const aminitieSsize=screenHeight*.08
const AddVehicle = () => {
  return (
    <SafeAreaView style={{padding:10}}>
        <Text>Choose your Transportation</Text>
          <View style={{flexDirection:'row',top:10}}>

<View style={{backgroundColor:'white',marginRight:25,width:aminitieSsize,
    height:aminitieSsize,justifyContent:'center',alignItems:'center',
    borderRadius:10,borderWidth:1,borderColor:'blue'}}>
      
      <Image source={require('../images/car.png')} style={styles.classimage}/>
      <Text>car</Text>
    </View>
    <View style={{backgroundColor:'white',marginRight:25,width:aminitieSsize,
    height:aminitieSsize,justifyContent:'center',alignItems:'center',
    borderRadius:10,borderWidth:1,borderColor:'blue'}}>
      
      <Image source={require('../images/truck.jpg')} style={styles.classimage}/>
      <Text>truck</Text>
    </View>
    <View style={{backgroundColor:'white',marginRight:25,width:aminitieSsize,
    height:aminitieSsize,justifyContent:'center',alignItems:'center',
    borderRadius:10,borderWidth:1,borderColor:'blue'}}>
      
      <Image source={require('../images/motorcycle.jpg')} style={styles.classimage}/>
      <Text>bike</Text>
    </View>
    <View style={{backgroundColor:'white',marginRight:25,width:aminitieSsize,
    height:aminitieSsize,justifyContent:'center',alignItems:'center',
    borderRadius:10,borderWidth:1,borderColor:'blue'}}>
      
      <Image source={require('../images/bike.png')} style={styles.classimage}/>
      <Text>bycicle</Text>
    </View>
    </View>
    </SafeAreaView>
  )
}

export default AddVehicle
const styles = StyleSheet.create({
    classimage:{
        height:30,
        width:40
    }
})