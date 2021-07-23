import React from 'react';
import {StyleSheet, View, FlatList, TouchableOpacity, Text} from 'react-native';

export const GPBar = ({onSubmit, gps}) => {
    const pressHandler = (GP) => {
            onSubmit(GP);
        };

    return (
        <View style={styles.main}>
            <FlatList
                horizontal={true}
                data={ gps }
                keyExtractor={ item => item.id }
                renderItem={({item}) => {
                    let bgColor = item.select ? '#F596C8' : '#006F62',
                        txtColor = item.select ? '#006F62' : '#F596C8';
                    return (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => pressHandler(item)}
                    >
                        <View style={[tabStyles.main, {backgroundColor: bgColor}]}>
                            <Text
                                style={[tabStyles.text, {color: txtColor}]}>{item.name}</Text>
                        </View>
                    </TouchableOpacity>
                    );
                }
                }
            >
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    main : {
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        height : 50,
        backgroundColor : '#006F62',
        paddingTop : 1,
        paddingBottom : 1,
        paddingLeft : 3,
        paddingRight : 2
    },
});

const tabStyles = StyleSheet.create({
    main: {
        height: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 5,
        borderWidth: 2,
        borderColor: '#006F62',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
        paddingLeft: 15
    },
    text: {
        fontSize: 15,
        fontFamily: 'F1Bold'
    }
});