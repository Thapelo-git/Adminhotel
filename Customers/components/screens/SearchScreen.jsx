import React,{useState,useEffect} from 'react'

import { SafeAreaView, StyleSheet, Text, View,TextInput,FlatList 
    ,TouchableOpacity,Image,ScrollView} from 'react-native'
import NearHotels from '../onbording/NearHotels'
import SearchData from '../onbording/SearchData'
import { COLORS } from '../styles/Colors'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchScreen = ({navigation}) => {
    const [searchtext,setSearchtext] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
    useEffect(() => {
        setFilteredDataSource(SearchData);
        setMasterDataSource(SearchData);
    }, [])

    const searchFilterFunction =(text)=>{
        if(text){
            const newData = masterDataSource.filter(function(item){
                const itemData = item._location ? item._location.toUpperCase()
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
    const ItemView = ({Hotels,index}) => {
      
        return (
          // Flat List Item
          <TouchableOpacity onPress={()=>navigation.navigate('Hotel Details',{data:Hotels,index:index})}>
          <View style={{padding:5}}>
          <ScrollView>
          <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
           
        {/* <Text
          style={{color:'#032B7A'}}
          onPress={() => getItem(item)}>
            
            {item._location.toUpperCase()}

        </Text> */}
        </View>
        <View style={{flexDirection:'row'}}>
          <View style={{padding:10}}>
        <Image source={Hotels._image} style={{height:120,width:120,borderRadius:10}}/>
        </View>
        <View style={{marginTop:20,}}>
        <Text
          style={{color:'#032B7A',fontWeight:'bold'}}
          onPress={() => getItem(Hotels)}>
            
            {Hotels.name.toUpperCase()}

        </Text>
          <View style={{flexDirection:'row'}}>
            <Ionicons name='location-sharp' size={21}/>
        <Text>{Hotels._location}</Text>
        </View>
        <Text>Successfully paid booking</Text>
     
            
        <Text>Price  {Hotels._price}</Text>
        
        
        </View>
        </View>
        </ScrollView>
        </View>
       </TouchableOpacity> );
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
    const Card =({Hotels,index})=>{
        return(
        <TouchableOpacity onPress={()=>navigation.navigate('Hotel Details',{data:Hotels,index:index})}>
        <View style={{flex:1,flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-between',padding:10}}>
            <Image source={Hotels._image} style={{width:'40%',height:120,borderRadius:10,marginTop:10}}/>
            <View style={{flex:1,flexDirection:'column',paddingHorizontal:15, marginTop:'5%'}}>
                <Text>{Hotels.hotelname}</Text>
                <View style={{flexDirection:'row'}}>
                    <Ionicons name='location-sharp' size={20}/>
                    <Text>{Hotels._location}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <Ionicons name='star' size={20} color='orange'/>
                    <Text>{Hotels.rating}</Text>
                </View>
            </View>
        </View>
        </TouchableOpacity>)
    }
    return (
        <SafeAreaView >
            <View style={styles.header}>
                
            </View>
             <View style={styles.inputContainer}>
        <Ionicons name="search" size={24}/>
        <TextInput 
        style={{fontSize:18,flex:1,marginLeft:10}}
        placeholder="Looking for previews hotel?"
        onChangeText={(text) => searchFilterFunction(text)}
        />
        
    
        </View>
           <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={({item,id})=><ItemView Hotels={item} index={id}/>}
        />
     
        
          
    
        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    inputContainer:{
      
        height:50,
        width:'100%',
        borderRadius:10,
        // borderWidth:1,
        flexDirection:'row',
        backgroundColor:COLORS.lightgray,
        alignItems:'center',
        paddingHorizontal:20, 
        
        
    },
    header: {
        width:'100%',
        height:20,
        paddingVertical: 30,
        // borderRadius:10,
        alignItems:'center',
        backgroundColor: '#0225A1',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom:12
        },
    container:{
        // padding:20,
        // height:'100%',
        // marginTop:20,
    },
    // headerContainer:{
    //     marginTop:20,
    // },
    
})
