import React, { useState ,useRef,useEffect} from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ImageBackground,ToastAndroid,
  Dimensions,ImageBackgroud,Animated,Pressable,TextInput
} from "react-native";
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign"
import Flatbutton from "../styles/button"
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Entypo from 'react-native-vector-icons/Entypo'
// import SlidingUpPanel from "rn-sliding-up-panel";
import DatePicker from "react-native-datepicker";

import moment from 'moment'
import { auth ,db} from './firebase'
import MapView, { PROVIDER_GOOGLE ,Marker} from "react-native-maps";
const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const {height} = Dimensions.get('window')
const imgContainerHeight = screenHeight * 0.1;
const imageC = screenHeight * 0.10;
const container =screenHeight -imageC
const aminitieSsize=screenHeight*.08
const itemRef =db.ref('/HotelBooking')
const HotelDetails = ({ navigation, route }) => {
  // const [food,setFood]=useState(false)
    const [gym,setgym]=useState(false)
    const [pool,setPool]=useState(false)
    const [wifi,setWifi]=useState(false)
   const [currentkey,setCurrentkey]=useState('')
   const [Phonenumber,setPhonenumber]=useState(route.params.phonenumber)
 
  
  let _panel= React.useRef(null)
  let bs=React.createRef();
  let fall = new Animated.Value(1)
  const list = route.params.data;
  
  

  const hotelinfor= list
  const location = list._location
  
  

  const Imageslist = ({ images, index }) => {
    return (
      <View style={{ marginRight: 20 ,}}>
       
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("GalleryScreen", {
              galary:galary,
              index: index,
            })
          }
        >
          <Image source={images} style={{ height: 80, width: 80,borderRadius:20 }} />
        </TouchableOpacity>
      </View>
    );
  };

 
  const BottomSheet =({onCancel,animation})=>{
    const [date,setDate]=useState( new Date())
  
      const [checkin,setCheckin]=useState(moment(new Date()).format('YYYY/MM/DD'))
      const [checkout,setCheckout]=useState(moment().add(1,'days').format('YYYY/MM/DD'))
      
      const setToastMsg =msg=>{
        ToastAndroid.showWithGravity(msg,ToastAndroid.SHORT,ToastAndroid.CENTER)
    }
      var a =moment(checkout)
      var b =moment(checkin)
      var given=moment("2022-01-15","YYYY-MM-DD")
     var diff=0
        var datetoday= new Date()
        var morr =moment().add(1,'days')
    return(
      <Animated.View style={{
        width:screenWidth,
        height:300,
        backgroundColor:'#fff',
        borderTopLeftRadius:30,borderTopRightRadius:30,padding:20,
        position:'absolute',
        zIndex:3,alignItems:'center',justifyContent:'center',
        maxHeight:3000,shadowColor:'#000',shadowOffset:{width:0,height:12},shadowOpacity:0.50,shadowRadius:16.80,
        bottom:animation,elevation:24, 
      }}>
        <ScrollView showsVerticalScrollIndicator={false} 
        style={{width:'100%'}}>
          <TouchableOpacity onPress={()=>onCancel()}>
            <View style={{
              alignItems:'center',justifyContent:"space-between",padding:20,top:-21}}>
              
                <EvilIcons name='close-o' size={25}/>
              {/* <Feather name='x' size={30}/> */}
            </View>
          </TouchableOpacity>
      
          <SafeAreaView>
          
               
              <View style={{padding:10,top:-15,
              flexDirection:'row',alignItems:'center',justifyContent:'space-around'}} >
         
                    <DatePicker
        style={{width: 140}}
        date={checkin}
        mode="date"
        placeholder="CHECK IN"
        format="YYYY/MM/DD"
         minDate={datetoday}
        // maxDate={datetoday}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setCheckin(date)}}
      />
                        <DatePicker
        style={{width: 140}}
        date={checkout}
        mode="date"
        placeholder="CHECK OUT"
        format="YYYY/MM/DD"
         minDate={morr}
        // maxDate={datetoday}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {setCheckout(date)}}
      />

              
           </View>
      <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
        {
              moment(checkin).isBefore(checkout)?(
                <Text></Text>
              ):(
             
              //  setToastMsg('checkout must not be before checkin')
              <Text style={{color:'red'}}>checkout must not be before checkin</Text>
              )
            }
             {
              moment(checkin).isSame(checkout)?(
                setToastMsg('date must not be the same')
               
              ):(
               <Text></Text>
              )
            }
            
      <Text style={{left:-9}}>{diff=(a.diff(b,'days'))} Nights</Text>
            {/* <Text>{moment.duration(given.diff(current)).asDays()}</Text> */}
      </View>
    
            <View style={{left:50,padding:20,top:20,}}>
              {
                 diff<=0?(
                   <TouchableOpacity disabled={true}
                   onPress={()=>
                      navigation.navigate('CheckAvailability',{
                       
                        hotelinfor:hotelinfor,
                        diff:diff,
                        Phonenumber:Phonenumber,
                        checkin:checkin,
                        checkout:checkout
                        })}>
                          <View style={styles.buttonstyle}>
                     <Text style={styles.buttonText}>Book Now</Text>
                     </View>
                   </TouchableOpacity>
            
                 ):(
                  <TouchableOpacity 
                   onPress={()=>
                      navigation.navigate('CheckAvailability',{
                       
                        hotelinfor:hotelinfor,
                        diff:diff,
                        Phonenumber:Phonenumber,
                        checkin:checkin,
                        checkout:checkout
                        })}>
                          <View style={styles.buttonstyle}>
                     <Text style={styles.buttonText}>Book Now</Text>
                     </View>
                   </TouchableOpacity>
                 )
              }
            
            </View>
          </SafeAreaView>
        </ScrollView>
      </Animated.View>
    )
  }
  const [animationValue,setAnimationValue]=useState(-1000)
  const showAnimation= useRef(new Animated.Value(animationValue)).current
  
  const toggleAnimation=()=>{
    
    const val= animationValue === 0 ? -1000 : 0
    Animated.timing(showAnimation,{
      useNativeDriver: false,
      toValue:val,
      duration:350

    }).start()
    setAnimationValue(val)
  }
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.imgContaner}>
      

        <View style={styles.headerContainer} 
            >
               <View style={{backgroundColor: 'white',
opacity: 0.7,width:30,
      height:30,justifyContent:'center',alignItems:'center',
      borderRadius:10,}}>
               <Feather name="arrow-left" size={30} color='black'
             onPress={()=>navigation.goBack()} /> 
             </View>
            <Text style={styles.headerTitle}></Text>
            </View>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginTop:imgContainerHeight}}>
<Image source={require('../images/classes.jpg')} style={styles.classimage}/>
</View>
      </View>
      
      <View style={styles.cardBox}>
        
        <View style={{paddingVertical:-5,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
      <Text
          style={{color:'#032B7A',fontWeight:'bold',fontSize:20, marginBottom:5}}
          >{list.name}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('MapScreen')} style={{flexDirection:'row'}}>
          <MaterialIcons name='location-pin' size={20}/>
      <Text style={{marginBottom:5, color:'gray'}}>{list.location}</Text>
      </TouchableOpacity>
      <View style={{flexDirection:'row'}}>
                        <Ionicons name='star' size={16} color='orange'/>
                        <Ionicons name='star' size={16} color='orange'/>
                        {/* <Ionicons name='star-half-sharp' size={16} color='orange'/> */}
                    <Text style={{marginHorizontal:10,marginStart:0}}>3.2</Text>
                    </View>
                    </View>
       
      </View>
      <View style={{paddingVertical:20}}>
     
        
    
        
        
        
        </View>
              <View style={{justifyContent:'center',alignItems:'center',width:'100%'}}>
        <Flatbutton  text='Check Availability'style={{top:10,}} 
        onPress={()=>{toggleAnimation()}}/>
</View>
        {/* <SlidingUpPanel
         ref={c=>(_panel=c)}
        draggableRange={{top:700,bottom:120}}
        showBackdrop={false}
        snappingPoints={[200]}
        height={900}
        friction={0.7}
        >
          <View
          style={{flex:1,
          backgroundColor:"transparent"}}>
            <View
            style={{height:60,backgroundColor:"transparent",marginLeft:-180,
            alignItems:"center",
            justifyContent:'center'}}>
              <Feather name='arrow-up' size={30}/>
              <Text style={{fontWeight:'bold'}}> Location Swipe up</Text>
            </View>
            <View style={{flex:1,
            backgroundColor:"#fff",alignItems:'center',justifyContent:'center'}}>
                <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
              //  initialRegion={list.coordinates}
              region={list.coordinates}
              >
                  <Marker coordinate={list.coordinates}
                  />
               
                </MapView>
            </View>
          </View>

        </SlidingUpPanel> */}
    
     <BottomSheet
     onCancel={()=>{toggleAnimation()}}
     animation={showAnimation}/>
      </View>
    </SafeAreaView>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  cardBox: {
    // paddingTop: 30,
    height:'100%',
    padding: 20,
    marginTop:screenHeight *0.2,
    backgroundColor: "white",
    // flex:1,

  },
  classimage:{
    width:300,
    height:90,
    marginTop: imgContainerHeight ,
    

    position:'absolute'
  },
  imgContaner: {
    width: screenWidth,
    height: imgContainerHeight,
    position: "absolute",
    top: 0,
    backgroundColor:'black',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  headerContainer:{
    top:10,
    flexDirection:'row',justifyContent:'space-between',
    alignContent:'center'
    

  },
  header:{
    backgroundColor:'#fff',
    shadowColor:'#333333',
    shadowOffset:{width:-1,height:-2},
    shadowRadius:2,
    shadowOpacity:0.4,
    paddingTop:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20

  },
  panelHandle: {
    width:40,
    height:8,
    borderRadius:4,
    
    backgroundColor: 'white',
    marginBottom:10,
  },
  panelHeader: {
    
    alignItems: 'center',
   
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1
  },
  buttonAdding:{
    // borderWidth:1,
    width:30,
    height:30,
    borderRadius:1,
    // borderColor:'black',
    justifyContent:'center',
    alignItems:'center'
},
inputContainer:{
  borderRadius:10,
  height:48,
  padding:10,
  flexDirection:'row',
  alignItems:'center',
  backgroundColor:'#EDEDED',
  elevation:2,
  width:150,

},
inputIconViewi:{
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
cvv: {
  paddingLeft: 12,
  width: '40%'

},
dataContainer: {
  flexDirection: "row",

  paddingBottom: 5,
  width: '100%',
  // justifyContent: 'space-between'
},
input: {
  width: '70%',
  borderColor: "black",
  borderStyle: "solid"
},
inputBox: {
  borderWidth: 2,
  borderRadius: 10,
  flexDirection: 'row',
  // paddingRight: 15,
  padding: 5,
  width: '60%',
  backgroundColor:'#EDEDED'
},

map:{...StyleSheet.absoluteFillObject},
buttonstyle:{
  borderRadius:10,
  paddingVertical:10,
  width:200,
  backgroundColor:'#4A1DD6',
  

},
buttonText:{
  color:'#fff',
  fontWeight:'normal',
  // textTransform:'uppercase',
  fontSize:20,
  fontStyle:'normal',
  textAlign:'center'
},
});
