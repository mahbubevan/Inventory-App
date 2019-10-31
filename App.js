import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';


import Colors from './Const/Colors'

//Importing Screens
import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import BrandList from './screens/BrandList'
import CategoryList from './screens/CategoryList'


export default function App() {

  const [screenName,setScreenName] = useState('login');
  const [confirmed,setConfirmed] = useState(false);

  const screenHandler = props => {
    setScreenName(props);
  }
  let screen = <Login onLogin={screenHandler} />;


  if(screenName === 'dashboard'){
    screen = <Dashboard 
                onLogout={screenHandler}
                onBrand={screenHandler}
              />
  }else if(screenName === 'brandList'){
    screen = <BrandList 
                  onDashboard={screenHandler}
                  onLogout={screenHandler}
              />
  }else if(screenName === 'categoryList'){
    screen = <CategoryList />
  }

  return (
    <View style={styles.container}>
      {screen}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'honeydew',
  },
});
