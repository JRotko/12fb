import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from'firebase/database';
import { useState, useEffect } from 'react';

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBMk8tsn7B10cgcxEfyOo7_yBlkCOHhinA",
    authDomain: "teht-7ed96.firebaseapp.com",
    projectId: "teht-7ed96",
    storageBucket: "teht-7ed96.appspot.com",
    messagingSenderId: "362009509230",
    appId: "1:362009509230:web:9ee545ead95a6025d8157f",
    databaseURL: "https://teht-7ed96-default-rtdb.europe-west1.firebasedatabase.app"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app)
  
  ref(database,'items/')

  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);

  const saveItem = () => {
      push(
        ref(database, 'items/'),
        {'product': product, 'amount': amount });
      }

  useEffect(() => {
    const itemsRef = ref(database, 'items/');
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      if (data != null ) {
        setItems(Object.values(data));
      }
    })
  }, []);


  
  return (
    <View style={styles.container}>
      <View style={styles.up}>
        <TextInput style={styles.input} onChangeText={product => setProduct(product)} placeholder="product" value={product}/>
        <TextInput style={styles.input} onChangeText={amount => setAmount(amount)} placeholder="Amount" value={amount}/>
        <Button title="Add" onPress={saveItem}/>
      </View>
      <View style={styles.down}>
        <Text>Shopping List {'\n'}</Text>
        <FlatList 
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <View style={{flexDirection: "row", marginTop: 3}}>
              <Text>{item.product}, {item.amount} </Text>              
            </View>}
          data={items}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1 
  },
  up : {
    flex: 1,
    justifyContent: 'flex-end',
  },
  down : {
    justifyContent: 'flex-start',
    flex: 3,
  }
});
