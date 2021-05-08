
import React,{ Component, useState } from 'react';
import { StyleSheet, Text, Platform, TextInput, View,TouchableOpacity, LogBox, Alert, } from 'react-native';


// firebase config 
import * as firebase from 'firebase';

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCKA0RYa3eaCnDsW4eZ0gOx0rGN5mgrmRE",
      authDomain: "fsbrn-e164d.firebaseapp.com",
      projectId: "fsbrn-e164d",
      storageBucket: "fsbrn-e164d.appspot.com",
      messagingSenderId: "817186006784",
      appId: "1:817186006784:web:9812ea6686fd4a3a88b5e5"
    };
    // Initialize Firebase
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }
    else{
      firebase.app();
    }
  
    LogBox.ignoreLogs(['Setting a timer']);
  
  class App extends React.Component{

    constructor(props){
      super(props);
      this.state = ({
        Name: '',
        Email: '',
        Password:'',
        Contact:'',
        Info:'',
      })
    }

    submitFormData(name,mail,pwd,num,info){
        console.log(name,mail,pwd,num,info)
        firebase.database().ref(this.state.name).push({
          Name:name,
          Email:mail,
          Password:pwd,
          Contact: num,
          Info:info, 
        }).then((data) => {
          console.log('List data : ',data)
          Alert.alert("Data Submited Successfully")
        }).catch((error) => {
          console.log('Error Occur : ',error)
        })

        firebase.auth().createUserEmailAndPassword(mail, pwd)
        .then((results) => { console.log(results,'login authentication data stored !!') })
        .catch((error) =>{ console.log(error);  })

    }

     render(){
       return(
        <View style={styles.container}>
          <TextInput placeholder='Enter Your Name' 
            style={styles.inp} 
            keyboardType='default' 
            maxLength={20}  autoCorrect={false} 
            onChangeText={ (name) => this.setState({name}) }   />

          <TextInput placeholder="Enter Your E-mail" 
            style={styles.inp} maxLength={20} 
            keyboardType='email-address' 
            autoCorrect={false} 
            onChangeText={ (mail) => this.setState({mail})  } />

          <TextInput 
            placeholder="Enter Your Password" 
            style={styles.inp} maxLength={15} 
            autoCorrect={false} secureTextEntry={true}
            onChangeText={ (pwd) => this.setState({pwd})  } />

          <TextInput 
            placeholder="Enter Your Contact number" maxLength={10} 
            style={styles.inp} keyboardType='numeric' autoCorrect={false} 
            blurOnSubmit={true}  onChangeText={ (num) => this.setState({num}) }  />

          <TextInput multiline={true} numberOfLines={4} maxLength={60} placeholder="Enter Your Short Description" style={styles.inp} 
          blurOnSubmit={true} onChangeText={ (info) => this.setState({info}) } />
          <TouchableOpacity style={styles.subbtn} 
          onPress={ () => this.submitFormData(this.state.name, this.state.mail, this.state.num, this.state.info ) }>
          <Text style={{ color:'#fff', fontSize:17, textAlign:'center',paddingHorizontal:15, fontSize:17, }} >Save My Info</Text>
          </TouchableOpacity>
        </View>
       );
     }
  }

  export default App;

  const styles = StyleSheet.create({
    container: {
      marginVertical: Platform.OS === 'android' ? 25 : 0 ,
      marginHorizontal:15,
      backgroundColor: '#fff',
      justifyContent: 'center',
      padding: 10,
    },
    wrap:{
      marginVertical: 20,
    },
    subbtn:{
      backgroundColor:'#5cb85c',
      borderRadius:10,
      fontSize: 17,
      marginVertical:20,  
      height: 40,
      paddingTop:10,
  
    },
    inp:{
      padding: 10,
      fontSize: 17,
      borderBottomColor: '#1a1a1a',
      borderBottomWidth: 2,
    },
  });
  


  