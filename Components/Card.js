import React from 'react'
import { View, StyleSheet } from 'react-native'

import Colors from '../Const/Colors'

const Card = props => {
    return(
        <View style={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:'100%',
        height:150,
        backgroundColor:'darksalmon',       
    }
})


export default Card