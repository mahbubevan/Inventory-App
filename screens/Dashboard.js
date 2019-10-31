import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, Button} from 'react-native'

import Card from '../Components/Card'
import Colors from '../Const/Colors'

const Dashboard = props => {

    const [brandCount,setBrandCount] = useState(0);
    const [productCount,setProductCount] = useState(0);
    const [categoryCount,setCategoryCount] = useState(0);
    const [transactionCount,setTransactionCount] = useState(0);

    useEffect(()=>{
        fetch('http://www.mahbubalamevan.me/test/nazif/api/api.php')
            .then(res => res.json())
            .then(res=>{
                setBrandCount(res['brand_count'])
                setProductCount(res['product_count'])
                setCategoryCount(res['category_count'])
                setTransactionCount(res['transaction_count'])
            })
    },[brandCount])

    const handlingTouchButton = props => {
        Alert.alert(
            'Brands',
            'BrandList',
            [{text:'Cancel',style:'cancel'}]
        )
    }

    return(
        <View style={styles.screen}>
            <View style={styles.logoutContainer}>
                <Button 
                    title="Logout"
                    onPress = {props.onLogout.bind(this,'login')}
                />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerText}> Manage Your Inventory </Text>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card} onPress={()=>{props.onBrand('brandList')}} >
                    <Card style={styles.cardText}>
                        <View style={styles.cardInnerPadding}><Text style={styles.text}>Available Brand</Text></View>
                        <View><Text style={styles.text}>{brandCount}</Text></View>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Card style={styles.cardText}>
                        <Text>Available Category</Text>
                        <Text>{categoryCount}</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity style={styles.card}>
                    <Card style={styles.cardText}>
                        <Text>Available Product</Text>
                        <Text>{productCount}</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Card style={styles.cardText}>
                        <Text>Available Transaction</Text>
                        <Text>{transactionCount}</Text>
                    </Card>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity>
                    <Card style={styles.button}>
                        <Text style={styles.text}>Make Transaction</Text>
                    </Card>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop:'20%'
    },
    header:{
        alignItems:'center',
        justifyContent:'center',
    },
    headerText:{
        fontWeight:'bold',
        fontSize:30,
    },
    cardContainer:{
        flexDirection:'row',
    },
    card:{
        flex:1,
        marginTop:'5%',
        marginLeft:10,
        marginRight:10,
    },
    cardText:{
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'whitesmoke'
    },
    cardInnerPadding:{
        paddingBottom:'10%',
    },
    buttonContainer:{
        width:'100%',
        padding:20,
        marginTop:20,
        justifyContent:'center',
        alignContent:'center'
    },
    button:{
        height:80,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'mediumspringgreen'
    },
    logoutContainer:{
        justifyContent:'flex-end',
        alignItems:'flex-end',
        textAlign:'center',
        paddingRight:20,
        paddingBottom:20
    }
})




export default Dashboard