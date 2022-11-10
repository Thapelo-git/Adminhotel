
import React from 'react'
import { SafeAreaView, StyleSheet, Text, View,TextInput,FlatList 
    ,TouchableOpacity,Image,ScrollView,Animated,Dimensions} from 'react-native'
import BottomSheet from 'react-native-gesture-bottom-sheet'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";


const GeoSearch = ({bottomopen,navigation,setSearchResult}) => {
const deviceHeight=Dimensions.get("window").height

const setMapLocation=(res)=>{
    // console.log(res)
    setSearchResult(res.description)
  }

const RenderAutocomplete = () => (
    <View style={styles.searchContainer}>
      <View>
        <Text style={{fontWeight:'bold',marginLeft:10}}>Where are you going</Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Location"
        onTimeout={()=>console.log('timeout')}
        onFail={(error)=>console.log('Error',error)}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          setMapLocation(data)
        }}
        styles={{ textInput: styles.inputContainer }}
        query={{
          key:"AIzaSyBTPFTAftGDxrC6SLNdnH-fYmcR0LSggvo",
          language: "en",
        //   types: "(cities)"
        }}
      />
    </View>
  );

  return (
    <SafeAreaView >
        <Animated.View>
            <BottomSheet
                hasDraggableIcon
                ref={bottomopen}
                customStyles={{
                wrapper: {
                    backgroundColor: "transparent"
                },
                draggableIcon: {
                    backgroundColor: "#000"
                }
                }}
                height={deviceHeight * 0.6}
            >
                <RenderAutocomplete/>
            </BottomSheet>
        </Animated.View>
    </SafeAreaView>
  )
}

export default GeoSearch

const styles = StyleSheet.create({
    searchContainer: {
        minHeight: 300
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
  });