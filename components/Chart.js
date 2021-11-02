import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import { ChartDot, ChartPath, ChartPathProvider, ChartYLabel } from '@rainbow-me/animated-charts';
import { useSharedValue } from 'react-native-reanimated';

export const { width: SIZE } = Dimensions.get('window');

const Chart = ({ currPrice, imgUrl, name, symbol, priceChangePerc, sparkline }) => {

    const updatedCurrPrice = useSharedValue(currPrice);
    const [chartR, setChartR] = useState(false);
    const priceChangeColor = priceChangePerc > 0 ? '#34C759' : '#FF3B30';
    useEffect(() => {
        updatedCurrPrice.value = currPrice;
        setTimeout(() => {
            setChartR(true);
        }, 1)
    }, [currPrice])

    const formatUSD = value => {
        'worklet';
        if (value === '') {
            return `$${updatedCurrPrice.value.toLocaleString('en-US', { currency: 'USD' })}`;
        }
        const formatValue = `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        return formatValue;
    };
    if (sparkline.length === 0) {
        return <Text>Loading...</Text>
    }
    return (
        <ChartPathProvider data={{ points: sparkline, smoothingStrategy: 'bezier' }}>
            <View style={styles.chartContainer}>
                <View style={styles.titleContainer}>
                    <View style={styles.upperTitles}>
                        <View style={styles.iconContainer}>
                            <Image source={{ uri: imgUrl }} style={styles.image} />
                            <Text style={styles.iconTitle}> {name} ({symbol.toUpperCase()}) </Text>
                        </View>
                        <Text style={styles.iconTitle}>7d</Text>
                    </View>
                    <View style={styles.priceContainer}>
                        <ChartYLabel
                            format={formatUSD}
                            style={styles.price}
                        />
                        {/* <Text style={styles.price}>$ {currPrice.toLocaleString('tr-TR', { currency: 'USD' })}</Text> */}
                        <Text style={[styles.subPrice, { color: priceChangeColor }]}>{priceChangePerc.toFixed(2)}%</Text>
                    </View>
                </View>
            </View>
            {
                chartR ?
                    (<View style={styles.chartLineContainer}>
                        <ChartPath height={SIZE / 2} stroke="black" width={SIZE} />
                        <ChartDot style={{ backgroundColor: 'black' }} />
                    </View>)
                    :
                    null
            }
        </ChartPathProvider>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        marginVertical: 16,
    },
    titleContainer: {
        marginHorizontal: 16,
    },
    upperTitles: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 4,
    },
    iconTitle: {
        fontSize: 14,
        color: '#A9AAB1',
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    subPrice: {
        fontSize: 18,
    },
    chartLineContainer: {
        marginTop: 15,
    }
})

export default Chart;


