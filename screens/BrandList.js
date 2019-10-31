import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text,TextInput, Button,
        FlatList, SafeAreaView, TouchableHighlight, TouchableOpacity,Alert
} from 'react-native'

import axios from 'axios'

import Colors from '../Const/Colors'

const BrandList = props => {

    const [brandList,setBrandList] = useState([]);
    const [brandName,setBrandName] = useState('');
    const [alertMsg,setAlertMsg] = useState('');
    const [confirm,setConfirm] = useState(false)
    //const [Id,setId] = useState(0);

    const brandNameHandler = (event)=> {
        setBrandName(event);
        setAlertMsg('');
    }

     useEffect(()=>{
        let unmounted = false 

        if(!unmounted){
            fetch('http://www.mahbubalamevan.me/test/nazif/api/BrandList.php')
            .then(res => res.json())
            .then(res=>{
              setBrandList(res)
            })
        }
       
        return () => {
            unmounted = true
        }

     },[brandList,confirm])

     const add_brand = ()=> {
        const credential = {
            name:brandName,
        }

        if(brandName===''){
            setAlertMsg('Filed Must Not Be Empty')
        }else{
            axios.post('http://www.mahbubalamevan.me/test/nazif/api/brand_add.php',credential)
            .then(res=>res)
            .then(res=>{
                setAlertMsg(res.data["msg"])
            })
        .done()
        }

     }

     const handleDelete = (userId)=>{
         const Id = userId
        axios.post("http://mahbubalamevan.me/test/nazif/api/brand_delete.php",{id:Id})
        .then((res)=>{
            setAlertMsg(res.data['msg'])
            setConfirm(true)
            //console.warn(Id)
        }).done()
     }

     const delete_brand = (userId)=>{
        //setId(userId)
        //console.warn(userId)
         Alert.alert('Are You Sure ?','User '+ userId+' Will Be Deleted',
                        [
                            {
                                text:'Ok',
                                style:'destructive',
                                onPress:(()=>{handleDelete(userId)})
                            },
                            {
                                text:'Cancel',
                                style:'default',
                            }
                        ]
                    )
     }
      
    return(
        <View style={styles.screen}>
            <View style={styles.navigation}>
                <View style={styles.navList}>
                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={()=>{props.onDashboard('dashboard')}}
                        >
                        <Text style={styles.navText}>Dashboard</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.navList}>
                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={()=>{props.onLogout('logout')}}
                        >
                        <Text style={styles.navText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.addContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Brand Name'
                        onChangeText={brandNameHandler}
                        value={brandName}
                    />
                    <Text style={styles.alertText}>
                        {alertMsg}
                    </Text>
                </View>
                <View style={styles.button}>
                    <Button 
                        title='Add New'
                        onPress={add_brand}
                    />
                </View>
            </View>
            <SafeAreaView>
                <FlatList 
                    style={styles.listTable}
                    data={brandList}
                    renderItem={({item, index, separators}) => (
                      <TouchableHighlight
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}
                        onPress={()=>{delete_brand(item.id)}}
                        >
                        <View style={styles.list}>
                          <View style={styles.listName}>
                            <Text style={styles.header}>{item.name}</Text>
                          </View>
                          <View style={styles.listName}>
                              <Text> {item.id} </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    )}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop:40
    },
    navigation:{
        marginTop:40,
        marginBottom:20,
        flexDirection:'row',
    },
    navList:{
        flex:1,
        justifyContent:'space-around',
        alignItems:'center',
    },
    navItem:{
        backgroundColor:Colors.primary,
        height:50,
        width:'80%'
    },
    navText:{
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:6,
        fontSize:23,
        color:'white'
    },  
    addContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    inputContainer:{
        shadowColor:Colors.primary,
        shadowOpacity:.3,
        shadowOffset:{
            width:5,
            height:5
        },
        shadowRadius:3,
        elevation:20
    },
    input:{
        height:40,
        color:Colors.accent,
        borderBottomWidth:1,
        borderBottomColor:Colors.accent,
        borderRadius:2,
        width:200,
        textAlign:'center',
        fontSize:20,
    },header:{
        textAlign:'center',
        justifyContent:'center',
        fontSize:15,
        marginTop:10,
        color:Colors.primary
    },
    list:{
        marginTop:20,
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    listTable:{
        width:'100%',
    },
    listId:{
        flex:1
    },
    listName:{
        flex:2
    },
    alertText:{
        color:'red',
    }
})

export default BrandList