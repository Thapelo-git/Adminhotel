import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import SplashScreen from './components/screens/SplashScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './components/screens/WelcomeScreen';
import SignIn from './components/screens/SignIn';
import SignUp from './components/screens/SignUp';
import ForgetPassword from './components/screens/ForgetPassword';
import TabScreen from './components/screens/TabScreen';
import HotelDetails from './components/screens/HotelDetails';
import GalleryScreen from './components/screens/GalleryScreen';
import CheckAvailability from './components/screens/CheckAvailability';
import confirmScreen from './components/screens/confirmScreen';
import EditProfile from './components/screens/EditProfile';
import Creditcard from './components/screens/Creditcard';
import PaymentScreen from './components/screens/PaymentScreen';
import SearchScreen from './components/screens/SearchScreen';
import HomeScreen from './components/screens/HomeScreen';
import { auth } from './components/screens/firebase';
import SmsScreen from './components/screens/Event';
import Notification from './components/screens/Notification';
import PaySucc from './components/screens/PaySucc';
import MapScreen from './components/screens/MapScreen';

const Stack = createNativeStackNavigator();
export default function App({navigation}) {
  const [signedIn,setSignedIn]=useState(false)

  auth.onAuthStateChanged((user)=>{
    if(user){
        setSignedIn(true);
       console.log(user.uid,"user------------")
     
    }else{
     
        setSignedIn(false);
    }
});
  return (
    
    <NavigationContainer>
      {!signedIn ?(
        <>
    <Stack.Navigator initialRouteName=" ">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="WelcomeScreen" options = {{headerShown :false}} component={WelcomeScreen} />
      <Stack.Screen name="SignIn" options = {{headerShown :false}} component={SignIn} />
      <Stack.Screen name="SignUp" options = {{headerShown :false}} component={SignUp} />
      <Stack.Screen name="ForgetPassword" options = {{headerShown :false}}  component={ForgetPassword} />
      </Stack.Navigator>
      </>
      ):(
        <>
        <Stack.Navigator >
            {/* <Stack.Screen name="Event" options = {{headerShown :false}} component={SmsScreen} /> */}
         <Stack.Screen name="HomeTap" options = {{headerShown :false}} component={TabScreen} />
      <Stack.Screen name="Hotel Details" options = {{headerShown :false}} component={HotelDetails} />
      <Stack.Screen name="Homescreen" options = {{headerShown :false}} component={HomeScreen} />
      <Stack.Screen name="GalleryScreen" options = {{headerShown :false}} component={GalleryScreen} />
      <Stack.Screen name="Notification"  component={Notification} />
      <Stack.Screen name="CheckAvailability" options = {{headerShown :false}} component={CheckAvailability} />
      <Stack.Screen name="confirmScreen" options = {{headerShown :false}} component={confirmScreen} />
      <Stack.Screen name="EditProfile" options = {{headerShown :false}} component={EditProfile} />
      <Stack.Screen name="Creditcard" options = {{headerShown :false}} component={Creditcard} />
      <Stack.Screen name="PaymentScreen" options = {{headerShown :false}} component={PaymentScreen} />
      <Stack.Screen name="PaySucc" options={{headerShown:false}} component={PaySucc}/>
      <Stack.Screen name="MapScreen" options={{headerShown:false}} component={MapScreen}/>
      {/* <Stack.Screen name="SearchScreen" options = {{headerShown :false}} component={SearchScreen} /> */}
    </Stack.Navigator>
    </>
      )}
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
