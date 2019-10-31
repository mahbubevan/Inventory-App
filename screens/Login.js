import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, 
        TouchableOpacity,

} from 'react-native'

import axios from 'axios';

import Card from '../Components/Card'
import Colors from '../Const/Colors'

const Login = props => {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmation,setConfirmation] = useState('');
    const [alertMsg,setAlertMsg] = useState('');

    const setUser = (event)=>{
        setUsername(event);
        setAlertMsg('')
    }

    const setPass = (event)=>{
        setPassword(event);
        setAlertMsg('')
    }
    let unmounted = false 

    useEffect(()=>{
        if(!unmounted){
            if(confirmation){
                setConfirmation(false)
                setAlertMsg('')
                props.onLogin('dashboard');
            }else{
        
            }
    
        }
        return () => {
            unmounted = true
        }
    },[confirmation])

    const checkLogin = () =>{
        const user = {
            name:username,
            password:password
        }
        
        if(!unmounted){
            axios.post('http://www.mahbubalamevan.me/test/nazif/api/GetUser.php',user)
            .then((res)=>{
            setConfirmation(res.data['status'])
            setAlertMsg(res.data['msg'])
        })
        .done()
        }
    }

    



    return(
        <View style={styles.screen}>
            <View>
                <Text> { alertMsg } </Text>
                <Text style={styles.text}> Sign In </Text>
            </View>
            <View style={styles.textInputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="username"
                    name='name'
                    onChangeText={setUser}
                    value={username}
                />
            </View>
            <View style={styles.textInputContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="password"
                    name='password'
                    onChangeText={setPass}
                    value={password}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonInnerContainer}>
                    <Card style={styles.button}>
                        <Text style={styles.buttonText}>Forget Password</Text>
                    </Card>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.buttonInnerContainer}
                    onPress = {checkLogin}
                
                >
                    <Card style={styles.button}>
                        <Text style={styles.buttonText}>Log In</Text>
                    </Card>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        marginTop:'50%',
        alignItems:'center'
    },
    textInputContainer:{
        marginTop:10,
    },
    textInput:{
        height:40,
        textAlign:'center',
        width:200,
        borderBottomWidth:2,
        borderBottomColor:Colors.primary,
        marginVertical:10
    },
    text:{
        fontSize:30,
        fontWeight:'bold',
        color:Colors.primary
    },
    buttonContainer:{
        width:'100%',
        padding:20,
        marginTop:20,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row'
    },
    buttonInnerContainer:{
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },
    button:{
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'honeydew',
        width:150,
        shadowColor:Colors.primary,
        shadowOpacity:.3,
        shadowOffset:{
            width:5,
            height:5
        },
        shadowRadius:3
    },
    buttonText:{
        color:Colors.accent,
        fontSize:20,
    }
})

export default Login