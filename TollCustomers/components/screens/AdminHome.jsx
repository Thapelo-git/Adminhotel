
import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
  Animated, TouchableOpacity,Alert, ImageBackground,Button} from 'react-native'
  import { StatusBar } from 'expo-status-bar';
  
  import { BarCodeScanner } from 'expo-barcode-scanner';


import { db,auth } from './firebase.jsx';
import Entypo from 'react-native-vector-icons/Entypo'
import { } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
//AdminHome
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
const Bookings = () => {
  const [animationValue,setAnimationValue]=useState(-1000)
  const showAnimation= useRef(new Animated.Value(animationValue)).current
  
 
  const [name,setName]=useState('')
  const [Booking,setBooking]=useState()
  const user =auth.currentUser.uid
  useEffect(()=>{
    
    
    db.ref('/TollPayment/').on('value',snap=>{
          
      const Booking=[]
         snap.forEach(action=>{
             const key=action.key
             const data =action.val()
             Booking.push({
                 key:key,
                 hotelimg:data.hotelimg,
                 price:data.price,
                Classes:data.Classes,
                 description:data.description,
                 hotelname:data.hotelname,
                 Status:data.Status,
                 userid:data.userid,
                 NoPlate:data.NoPlate,

                 
             })
            })
   
    
            setBooking(Booking);
            setFilteredDataSource(Booking);
           setMasterDataSource(Booking);
           
          }
          
             
        
     
  )},[])
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
   
const day=moment(new Date()).format('YYYY/MM/DD')
    const updateBooking = (key, status) => {
      Alert.alert('Confirm','Are you sure you want to Approve?',[
        {text:'Yes',
       onPress:()=>db.ref('TollPayment').child(key).update({Status:status,description:status})
       .then(()=>db.ref('TollPayment').once('value'))
       .then(snapshot=>snapshot.val())
       .catch(error => ({
         errorCode: error.code,
         errorMessage: error.message
       })),
      },
      {text:'No'},
      ]);
      
   
      
    };
    const searchFilterFunction =(text)=>{
        if(text){
            const newData = masterDataSource.filter(function(item){
                const itemData = item.hotelname ? item.hotelname.toUpperCase()
                :''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf( textData)>-1;

            })
            setFilteredDataSource(newData);
            setSearchtext(text)
        }else {
            setFilteredDataSource(masterDataSource);
            setSearchtext(text)
        }
    }
    const ItemView = ({item}) => {
        return (
            <>
          
            {
             item.Status == 'Pending'?(
               <>
          
           <View style={{width:230,height:380,margin: 20,
           justifyContent:'center',alignItems:'center'}}>
          <ImageBackground source={require('../images/ticket1.jpg')}
           style={{height:220,width:220,justifyContent:'center',alignItems:'center',
           margin:10}}>
            {/* <Text style={{color:"#fff"}}>Ticket ID{item.key}</Text> */}
            <View style={{justifyContent:'flex-start',alignItems:'flex-start',width:'100%'}}>
            
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-end',}}>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Tollgate Name
          </Text>
            <Text  style={{color:'#fff',}}>  {item.hotelname} </Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'stretch',}}>
            <View>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Class No:   
          </Text>
            <Text  style={{color:'#fff',}}>  {item.Classes} </Text>
            </View>
            <View>

            </View>
            <View>
            <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Price:
          </Text>
            <Text  style={{color:'#fff',}}>  {item.price} </Text>
            </View>
            <View>
              
            </View>
            </View>
            </View>

           <Text
            style={{color:'#fff',fontWeight:'bold',}}
            >  
              Number Plate:
          </Text>
            <Text  style={{color:'#fff',}}>  {item.NoPlate} </Text>
   
          <View style={{width:'100%',}}><Text style={{color:'#fff'}}>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - </Text></View>
          <Image style={{height:40,width:150}} source={require('../images/Barcode.jpg')}/>
          
          <Text style={{color:"#fff"}}>{item.key}</Text>
          <Text style={{color:"#fff"}}>Ticket ID</Text>
          </ImageBackground>
          <View style={{alignItems:'center'}}>
          
         
          <View style={{alignItems:'center',justifyContent:'center',width:'100%'}}>
          <TouchableOpacity style={{height:30,width:70,justifyContent:'center',borderColor:'red',
          alignItems:'center',borderWidth:0.5}}  onPress={()=>updateBooking(item.key,'Approved',item.checkout)}>
          <Text style={{color:'red'}}>Approve</Text>
          </TouchableOpacity>
          </View>
          </View>
          </View>
          </>
        ):(<></>)
      }
        </>
       
         
        )}
      
     
    
        const onSignout =()=>{
        
            auth.signOut()
            
        }
     
        const [hasPermission, setHasPermission] = React.useState(false);
        const [scanData, setScanData] = React.useState();
      
        useEffect(() => {
          (async() => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
          })();
        }, []);
      
        if (!hasPermission) {
          return (
            <View style={styles.container}>
              <Text>Please grant camera permissions to app.</Text>
            </View>
          );
        }
      
        const handleBarCodeScanned = ({type, data}) => {
          setScanData(data);
          console.log(`Data: ${data}`);
          console.log(`Type: ${type}`);
        };
    return (
       
          
           
<View style={styles.container}>
      <BarCodeScanner 
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
        />
      {scanData && <Button title='Approved !!! Scan next One?' onPress={() => setScanData(undefined)} />}
      <StatusBar style="auto" />
    </View>
        
    )
}

export default Bookings

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    height:50,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:'#eee',
    alignItems:'center',
    paddingHorizontal:20, 
},
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
header: {
  width:'100%',
  height:50,
  paddingVertical: 10,
  // borderRadius:10,
  alignItems:'center',
  backgroundColor: '#0225A1',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:12,
  justifyContent:'center',
 
  },
})


