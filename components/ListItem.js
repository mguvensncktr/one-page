import React from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

const ListItem = ({ onPress, name, symbol, currPrice, priceChangePerc, imgUrl }) => {

    const priceChangeColor = priceChangePerc > 0 ? '#34C759' : '#FF3B30';

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemContainer}>
                <View style={styles.itemLeft}>
                    <Image style={styles.itemImage} source={{ uri: imgUrl }} />
                    <View style={styles.titleContainer}>
                        <Text style={styles.itemTitle}>
                            {name}
                        </Text>
                        <Text style={styles.itemSubTitle}>
                            {symbol.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.itemTitle}>
                        $ {currPrice.toLocaleString('tr-TR', { currency: 'USD' })}
                    </Text>
                    <Text style={[styles.itemSubTitle], { color: priceChangeColor }}>
                        {priceChangePerc.toFixed(2)}%
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemRight: {
        alignItems: 'flex-end',
    },
    itemImage: {
        width: 48,
        height: 48,
    },
    titleContainer: {
        paddingLeft: 8,
    },
    itemTitle: {
        fontSize: 18,
    },
    itemSubTitle: {
        fontSize: 14,
        color: '#A9ABB1',
        marginTop: 4,
    },
})

export default ListItem;
