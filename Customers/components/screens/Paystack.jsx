import React,{useRef} from 'react';
import  { Paystack,paystackProps }  from 'react-native-paystack-webview';

import { View ,TouchableOpacity,Text} from 'react-native';

const Paystack=()=> {
    // const paystackWebViewRef = useRef<paystackProps.PayStackRef>(); 
  return (
    <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="pk_test_dafe3738f1b6411fd800b23e1ea0f156d5415954"
        amount={'25000.00'}
        billingEmail="chabathapelo1@gmail.com"
        activityIndicatorColor="green"
        onCancel={(e) => {
         alert('Payment Cancelled')
        }}
        onSuccess={(res) => {
        
        }} 
        currency={'ZAR'}
        autoStart={true}
      />
      <TouchableOpacity onPress={()=> paystackWebViewRef.current.startTransaction()}>
          <Text>Pay Now</Text>
        </TouchableOpacity>
    </View>
  );
}
export default Paystack