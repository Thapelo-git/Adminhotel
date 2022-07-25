import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Text, View,FlatList,TextInput, Image, ScrollView ,
  Animated, TouchableOpacity ,Alert} from 'react-native'
import { SearchBar } from 'react-native-elements';

import NearHotels from '../onbording/NearHotels.jsx';
import { COLORS } from '../styles/Colors'
import { db,auth } from './firebase.jsx';
import Entypo from 'react-native-vector-icons/Entypo'
import { } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Cancellation from './Cancellation.jsx';
import moment from 'moment'

const HistoryScreen = () => {
    const [searchtext,setSearchtext] = useState('');
    const [Booking,setBooking]=useState()
    const [cancelled,setCancelled]=useState()
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const user = auth.currentUser.uid;
  const [userid,setUserid]=useState()
  useEffect(()=>{
    
    
    db.ref('/Booking/').on('value',snap=>{
          
      const Booking=[]
         snap.forEach(action=>{
             const key=action.key
             const data =action.val()
             Booking.push({
                 key:key,
                 hotelimg:data.hotelimg,
                 totPrice:data.totPrice,
                 checkin:data.checkin,
                 checkout:data.checkout,
                 description:data.description,
                 hotelname:data.hotelname,
                 Status:data.Status,
                 userid:data.userid,

                 
             })
            })
    // db.ref('/users/'+ user).on('value',snap=>{
    //   setBooking(snap.val().Booking)
     
    //  })
   
            console.log(user)
            // moment(checkin).isBefore(checkout)
           
             if(user){
               const userinfor = Booking.filter(function(item){
                const itemData = item.userid?
       
  (  item.userid)
                :   ( '') 
                const textData = user;
                return itemData.indexOf( textData)>-1;

            })
            const text='Cancelled'
            const Completed='Completed'
            if(text || Completed){
              const newData = userinfor.filter(function(item){
                const itemData = item.Status ? item.Status
                :'';
                const textData = (text || Completed);
                return itemData.indexOf( textData)>-1;

            })
          
            setBooking(newData)
              setFilteredDataSource(newData);
             setMasterDataSource(newData);
            }
             
              
             
            }
          
             
        //  })
     })
     
  },[])
  
  const handleDelete=(key)=>{
    Alert.alert('Confirm','Are you sure you want to delete?',[
      {text:'Yes',
     onPress:()=>db.ref('Booking').child(key).remove(),
    },
    {text:'No'},
    ]);
    

    }
  const onClick=(key)=>{
    db.ref('Booking').child(key).update({Status:'Completed'})
    .then(()=>db.ref('Booking').once('value'))
    .then(snapshot=>snapshot.val())
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message
    }))
  }

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
          // Flat List Item
          <View style={{padding:5}}>
          <ScrollView>
          <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
           
       
        
        
          <View style={{padding:10}}>
        <Image source={{uri:item.hotelimg}} style={{height:120,width:120,borderRadius:10}}/>
        </View>
        <View style={{marginTop:20,}}>
        <View style={{flexDirection:'row',alignItems:'stretch',justifyContent:'space-between'}}>
        <Text
          style={{color:'#032B7A',fontWeight:'bold',fontSize:20}}
          onPress={() => getItem(item)}>
            
            {item.hotelname}

        </Text>
     
        </View>
         
        <Text>Payment ID:</Text>
          <Text>{item.key}</Text>
        {
        item.description == 'Cancelled'?(
          <Text style={{color:'red'}}>{item.description}</Text>
        ):(<Text style={{color:'green'}}>{item.description}</Text>)
      }
       
   
        
        <View style={{flexDirection:'row',alignItems:'stretch',justifyContent:'space-between'}}>
        <Text
          style={{color:'#032B7A',fontWeight:'bold'}}
          onPress={() => getItem(item)}>
            
            

        </Text>
        <TouchableOpacity onPress={()=>handleDelete(item.key)}>
        <MaterialIcons name='delete' size={25} color='red'/>
        </TouchableOpacity>
        </View>
        </View>
        </View>
        </ScrollView>
        </View>
        );
      };
    
      const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#C8C8C8',
            }}
          />
        );
      };
    
      const getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.name);
      };
    return (
        <View>
           {/* <SearchBar
           placeholder="Looking for previews hotel?"
           onChangeText={(text) => searchFilterFunction(text)}
           onClear={(text) => searchFilterFunction('')}
           value={searchtext}
           round
     
           /> */}
            <View style={styles.header}>
                <Text style={{color:'#fff'}}>My History</Text>
                </View>
           <View style={{
            marginTop:20,
            flexDirection:'row',
            paddingHorizontal:20,
        }}>
        <View style={styles.inputContainer}>
        <Ionicons name="search" size={24}/>
        <TextInput 
        style={{fontSize:18,flex:1,marginLeft:10}}
        placeholder="Looking for previews payment?"
        onChangeText={(text) => searchFilterFunction(text)}
        />
        {/* <TouchableOpacity onPress={(text) => searchFilterFunction('')}>
       <Entypo name='circle-with-cross' size={20}/>
       </TouchableOpacity> */}
        </View>
        </View>
           <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
  inputContainer:{
    flex:1,
    height:50,
    borderRadius:10,
    flexDirection:'row',
    backgroundColor:COLORS.lightgray,
    alignItems:'center',
    paddingHorizontal:20, 
},header: {
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
