import React,{useState,useEffect} from 'react'
import { SafeAreaView, StyleSheet, Text, View,Dimensions,TextInput,Image,
   Button, TouchableOpacity,Alert, ScrollView } from 'react-native'
    import { Formik } from 'formik'
    import * as yup from 'yup'
import { db,auth } from './firebase'
import * as SMS from 'expo-sms';

const screenwidth=Dimensions.get('screen').width
const Creditcard = ({navigation,route}) => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    
   const datetoday=new Date()
    const user = auth.currentUser.uid;
    const ReviewSchem=yup.object({
        cardNumber:yup.string().required().min(16).max(16),
        cardName:yup.string().required().min(2),
        CVV:yup.string().required().min(3).max(3),
        Expiry:yup.string().required().min(5).max(5),
   
    })
    const addCard=(data)=>{
        const {cardName,cardNumber,CVV,Expiry} = data
        const userid= auth.currentUser.uid
        db.ref(`/users`).child(userid).update({
            cardName:cardName,cardNumber:cardNumber,CVV:CVV,Expiry:Expiry
          })
    }

   
   // const [Phonenumber,setPhonenumber]=useState(route.params.Phonenumber)
    // const Phonenumber=route.params.Phonenumber
   const [Status,setStatus]=useState('Pending')
   const [cardName,setCardName]=useState('')
   const [cardNumber,setCardNumber]=useState('')
   const [CVV,setCVV]=useState('')
   const [Expiry,setExpiry]=useState('')
   useEffect(()=>{
    db.ref('/users/'+ user).on('value',snap=>{
      
      setCardName(snap.val() && snap.val().cardName);
  
  setCardNumber(snap.val().cardNumber)
  setCVV(snap.val().CVV)
  setExpiry(snap.val().Expiry)
    })
  
}) 
//   },[])
// const con =[]
// con.push(description,checkin,checkout)
// const onComposeSms = async () => {
//     // smsServiceAvailable &&
//     if ( Phonenumber && statement) {
//         try{
//             await SMS.sendSMSAsync(Phonenumber.toString(), statement);
//         }catch{(e)=>
//             console.log(e)
//         }
     
//     }
//   };
    
    return (
        <SafeAreaView>
            
             <View style={styles.header}>
                <Text style={{color:'#fff'}}>My Cards</Text>
                </View>
        <View style={styles.container}>
        <View style={styles.card}>
        <Image source={require('../images/MasterCard.png')}
                style={{height:40,width:80,position:'absolute',top:20,right:20}}/>
                <View style={{position:'absolute',bottom:10,left:0,right:0,paddingHorizontal:20}}>
                    <Text style={{fontSize:30}}>{cardName}</Text>
                    <View style={{flexDirection:'row'}}>
                    <Text style={{flex:1}}>{cardNumber}</Text>
                    <Text>{Expiry}</Text>
                    </View>
                </View>
        </View> 
        <Formik
        initialValues={{cardNumber:'',cardName:'',CVV:'',Expiry:''}}
        validationSchema={ReviewSchem}
        onSubmit={(values,action)=>{
            action.resetForm()
            addCard(values)
        }}
        >
            {(props)=>(
                <ScrollView>
           <View style={{padding:10}}>
               <Text>Card Number</Text>
               <TextInput
               placeholder='number'
          
               keyboardType='numeric'
               onChangeText={props.handleChange('cardNumber')}
             value={props.values.cardNumber}
             onBlur={props.handleBlur('cardNumber')}
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardNumber && props.errors.cardNumber}</Text>
                <Text>Cardholder Name</Text>
               <TextInput
               placeholder='Name'
               onChangeText={props.handleChange('cardName')}
               value={props.values.cardName}
               onBlur={props.handleBlur('cardName')}
               
               />
                <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.cardName && props.errors.cardName}</Text>
               <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
               <Text>Expiry Date</Text>  
               <Text>CVV</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
             <View>
               <TextInput
               placeholder='Expiry'
               keyboardType='numeric'
               onChangeText={props.handleChange('Expiry')}
               value={props.values.Expiry}
               onBlur={props.handleBlur('Expiry')}
               
               />
                 <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.Expiry && props.errors.Expiry}</Text>
                 </View>
                 <View>
               <TextInput
               placeholder='CVV'
               keyboardType='numeric'
               
               onChangeText={props.handleChange('CVV')}
               value={props.values.CVV}
               onBlur={props.handleBlur('CVV')}
               />
               <Text style={{color:'red',marginTop:-15,paddingVertical:10}}>{props.touched.CVV && props.errors.CVV}</Text>
               </View>
                   </View>
                   {/* <TextInput
    style={styles.input}
    value={Phonenumber}
    onChangeText={text => setPhonenumber(text)}
    keyboardType='number-pad'
    placeholder='Enter phone number here'
  /> */}
                   <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingLeft:50}}>
                       <Button 
                       title='Add Card'
                       onPress={props.handleSubmit}/>
                           
{/*                        
                       <Button
    title='Pay Booking'
    onPress={addBooking}
    // disabled={!smsServiceAvailable}
  /> */}
                       {/* <TouchableOpacity onPress={addBooking()}>
                       <Text>Add Card</Text>
                       </TouchableOpacity> */}
                   </View>
                   
           </View>
           </ScrollView> )}</Formik>
        </View>
        
        </SafeAreaView>
    )
}

export default Creditcard

const styles = StyleSheet.create({
       container:{
        height:'100%',
        marginTop:5,
        backgroundColor:'white',
        width:screenwidth,
        padding:10,
    },
    card:{
        borderWidth:1,
        borderColor:'black',
        width:"100%",
        height:180,
        borderRadius:10,
    }
    ,header: {
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
        input: {
            height: 40,
            width: '100%',
            margin: 12,
            borderWidth: 1,
            paddingHorizontal: 10
          }
})
