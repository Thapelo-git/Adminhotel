import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from './HomeScreen';
import { COLORS } from '../styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import HistoryScreen from './HistoryScreen';
import Bookings from './Bookings';
import ProfileScreen from './ProfileScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HotelDetails from './HotelDetails';
import GalleryScreen from './GalleryScreen';
import SearchScreen from './SearchScreen';
import PayHistory from './PayHistory';
import AddVehicle from './AddVehicle';
const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
function combineHotel(){
  return (
    
    
    <Stack.Navigator
    >
    <Stack.Screen name="HomeScreen" options = {{headerShown :false}} component={HomeScreen} />
      <Stack.Screen name="Hotel Details" options = {{headerShown :false}} component={HotelDetails} />
      <Stack.Screen name="GalleryScreen" options = {{headerShown :false}} component={GalleryScreen} />
    </Stack.Navigator>
  
  )}
    
const TabScreen = () => {
    return (
        <Tab.Navigator
        initialRouteName="HomeScreen"
        activeColor="#0225A2"
        barStyle={{
            backgroundColor:'#fff',
              borderRadius: 15, elevation: 6, alignItems:'center', justifyContent: 'center', position:'absolute', marginVertical:-10,marginHorizontal:25, height:65,paddingBottom:10, paddingLeft:10, paddingRight:10,bottom:20, paddingTop:10
          }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen}
            options={{
                tabBarLabel:'Home',
                tarBarColor:COLORS.theme,
                tabBarIcon:({color}) =>
            <Icon name="ios-home" color={color} size={26}/>}}/>
            <Tab.Screen name="HistoryScreen" component={AddVehicle}
            options={{
                tabBarLabel:'Add-Vehicle',
                tarBarColor:COLORS.theme,
                tabBarIcon:({color}) =>
            <FontAwesome name="plus" color={color} size={26}/>}}/>
           
            <Tab.Screen name="Bookings" component={PayHistory}
            options={{
                tabBarLabel:'Payments',
                tarBarColor:COLORS.theme,
                tabBarIcon:({color}) =>
                <Icon name="ios-wallet" color={color} size={26}/>}}/>
            <Tab.Screen name="ProfileScreen" component={ProfileScreen}
            options={{
                tabBarLabel:'Profile',
                tarBarColor:COLORS.theme,
                tabBarIcon:({color}) =>
            <FontAwesome name="user" color={color} size={26}/>}}/>
        </Tab.Navigator>
    )
}

export default TabScreen

const styles = StyleSheet.create({})
