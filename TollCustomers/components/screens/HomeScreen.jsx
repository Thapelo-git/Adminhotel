import React, { useState, useEffect ,useRef} from 'react'
import {
    SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity,
    FlatList, Dimensions, ImageBackground, StatusBar,  ActivityIndicator
} from 'react-native'
import { ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Hotels from '../onbording/Hotels'10205409
//https://dribbble.com/shots/18568156-ECHO-PARK-Parking-Space-Finder-App
//https://github.com/react-native-voice/voice/blob/master/example/src/VoiceTest.tsx
//https://dribbble.com/shots/15942307-Fashion-Store-Mobile-Version
import MapView, { Callout, Marker } from 'react-native-maps'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {Dummy_Tollgates} from '../screens/Dummy_Tollgates'
import { Route } from './Route'
import * as Location from "expo-location";
import { auth,db } from './firebase';
import SearchScreen from './SearchScreen';
import {Picker} from '@react-native-picker/picker';

import GeoSearch from './GeoSearch'
import MapViewDirections from 'react-native-maps-directions';
const { width } = Dimensions.get("screen")
const cardWidth = width / 1.8
const HomeScreen = ({ navigation }) => {
  
//latitude: 37.3318456, longitude: -122.0296002
//latitude: 37.771707, longitude: -122.4053769
  const origin = {latitude: -23.9045, longitude: 29.4689};
  const destination = {latitude: -23.8320, longitude: 30.1358};
const GOOGLE_MAPS_APIKEY = 'AIzaSyA-ASFWlHOSno9rzIInkNsiAmIKMEuT2eA';

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [location, setLocation] = useState(false)
    
    const [Tollgate, setTollgate] = useState([])
    const [isLoading, setLoading] = useState(false);
   
    const user = auth.currentUser.uid;
    useEffect(() => {
        db.ref('/Tollgate').on('value', snap => {

            const Tollgate = []
            snap.forEach(action => {
                const key = action.key
                const data = action.val()
                Tollgate.push({
                    key: key,
                    location: data.location,
                    name: data.name,
                    url: data.url,
                    Route: data.Route,
                    Road: data.Road,
                    Class1: data.Class1,
                    Class2: data.Class2,
                    Class3: data.Class3,
                    Class4: data.Class4,
                })
                setTollgate(Tollgate)
                setFilteredDataSource(Tollgate);
                setMasterDataSource(Tollgate);

            })
        })
        db.ref('/users/' + user).on('value', snap => {

            setName(snap.val() && snap.val().name);
            setPhonenumber(snap.val().phonenumber)
            setEmail(snap.val().email)
        })



    }, [])
   
    const [searchtext, setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);


  

    const [Routeplace, setRouteplace] = useState([]);
    const [RouteContainer, setRouteContainer] = useState('')
    const [DestinLocation,setDestinLocation]=useState('')
    const setMapLocation=(res)=>{
     
      setDestinLocation(res.description)
    }
    const FilterFunction = () => {
        if (DestinLocation) {
            const newData = Route.filter(function (item) {
                const itemData = item.place ? item.place.toUpperCase()
                    : ''.toUpperCase();
                const textData = DestinLocation.toUpperCase();
                return itemData.indexOf(textData) > -1;

            })
            setRouteplace(newData)
            
        }
    }
    const bottomopen = useRef()
    const [modalopen,setModalopen]=useState(false)
    const [ selectedBtnIndex,setSelectedBtnIndex] = useState(0);
    
   
    const [longitude, setLongitude] = useState(0);
    const [latitude, setLatitude] = useState(0);
  
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  
    const onOpenSnack = () => {
      setIsSnackBarVisible(!isSnackBarVisible);
    };
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
  
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
        var { latitude, longitude } = coords;
        setLatitude(latitude);
        setLongitude(longitude);
      })();
    }, []);
  
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff',padding:10}}>
            <StatusBar
                backgroundColor="#0225A1"
                barStyle="light-content"
            />
  

            <View style={{
                marginTop: 20,
                flexDirection: 'row',
                paddingHorizontal: 20,
            }}>
                <TouchableOpacity style={styles.inputContainer}
                onPress={()=>bottomopen.current.show()}>

                    <Ionicons name="search" size={24} />

                    <View
                        style={{ fontSize: 18, flex: 1, marginLeft: 10 }}
                        ><Text>{DestinLocation}</Text></View>
                       
                  
                </TouchableOpacity>
            </View>
        
            {/* <View>
            <View style={{ paddingVertical: 20 }}>

<Text style={styles.titles}>Select Your Destination</Text>

<Picker
  selectedValue={RouteContainer}
  style={{width:300,height:50,backgroundColor:'#eee'}}
  onValueChange={(value, id) => { FilterFunction(value) }}
>
  <Picker.Item label="select" value="" />
  <Picker.Item label="PLK To JHB" value="N1" />
  <Picker.Item label="JHB To Dur" value="N3" />
 
  
</Picker>
<FlatList
                keyExtractor={(_, key) => key.toString()}
                vertical
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: 20 }}
                data={Route}
                renderItem={({ item, index }) => <Card Tollgate={item} index={index} />}
            />


</View>

            
        </View> */}
             <MapView
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.029,
        }}
      >
        <Marker
               
                coordinate={{
                  
                  latitude: latitude,
                  longitude: longitude,
                }}
                
              ></Marker>
              {
                Route.filter(element=>element.place===DestinLocation).map(
                  item=>(
                    <MapViewDirections
                    origin={{latitude: latitude,
                      longitude: longitude,}}
                    destination={item.coords}
                    apikey={GOOGLE_MAPS_APIKEY}
                    strokeWidth={4}
                    strokeColor='#000'
                  />
                  )
                )
              }
     
        {Dummy_Tollgates.map((place) => {
          return (
            <> 
              <Marker
                key={place.id.toString()}
                title={place.place}
                coordinate={{
                  
                  latitude: place.coords.latitude,
                  longitude: place.coords.longitude,
                }}
                
              >
       
                <Callout onPress={()=>navigation.navigate('HotelDetails',{
                  Plazzname:place.place,class:place.class
                })}>
           
          
                    <View style={styles.bubble}>
                  <Text>{place.place}</Text>
                  {place.class.map((place) => {
          return (
            <View style={{flexDirection:'row',}}>
            <Text>{place.class}{":R"}</Text> 
            <Text>{place.price}</Text> 
             </View>
          );
        })}
                  {/* <Text>class1=R{place.class.class}</Text>
                  <Text>class2=R{place.class.class2}</Text>
                  <Text>class3=R{place.class.class3}</Text>
                  <Text>class4=R{place.class.class4}</Text> */}
                  </View>
                  
                </Callout>
              </Marker>
            </>
          );
        })}
      </MapView>
      {/* <ScrollView
      horizontal
      scrollEventThrottle={1}
      showsHorizontalScrollIndicator={false}
      height={50}
      style={styles.chipsScrollView}
      >
                {Dummy_Tollgates.map((place,index) => {
          return (
  <TouchableOpacity style={styles.chipsItem} key={index}
          onPress={() => navigation.navigate('HotelDetails', {
              data: place, 
              phonenumber: phonenumber
          })}
          >
                    <View style={styles.bubble}>
                  <Text>{place.place}</Text>
                  <Text>class1=R{place.class.class1}</Text>
                  <Text>class2=R{place.class.class2}</Text>
                  <Text>class3=R{place.class.class3}</Text>
                  <Text>class4=R{place.class.class4}</Text>
                  </View>
                  </TouchableOpacity>
          )})}
      </ScrollView> */}
          {/* <SearchScreen bottomopen={bottomopen} navigation={navigation}/> */}
        <GeoSearch bottomopen={bottomopen} setMapLocation={setMapLocation}/>
     


        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%",
      },
      inputContainer: {
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.5,
        borderRadius: 10,
        marginHorizontal: 10,
        paddingVertical:10,

      },
      chipsItem:{
        flexDirection:'row',
        height:35,
        paddingHorizontal:24,
        marginHorizontal:10,padding:8,
      },
    header: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor: '#eee',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    btnListContainer: {
        marginLeft: -10,
        
        paddingHorizontal: 10,
        paddingVertical: 30,
        // alignItems:'center'
    },
    categoryBtn: {
        height: 45,
        width: 80,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',

    },
    card: {
        height: 220,
    },
    cardContainer: {
        height: 100,
        width: cardWidth * 1.5,
        marginRight: 20,
        // marginBottom:20,
        marginVertical: 10,
        // marginTop:5,
        borderRadius: 15,
        elevation: 15,
        backgroundColor: '#fff',
        flexDirection: 'row', alignItems: 'center'

    },
    discountcard: {
        flexDirection: 'row', justifyContent: 'center',
        width: '100%',
        height: 110,
        // width:cardWidth*1.5,
        // marginRight:20,

        // marginHorizontal:10,

        // borderRadius:15,
        // elevation:15,
        // backgroundColor:COLORS.white,
        alignItems: 'center',
    },

    cardImage: {
        height: 100,
        width: width / 3,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
    }
})
