import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Chart from './components/Chart';
import { getMarket } from './api/service'

const ListHeaderItem = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Markets</Text>
      <View style={styles.divider} />
    </View>
  )
}

export default function App() {

  const [data, setData] = useState([]);
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarket();
      setData(marketData);
    }
    fetchMarketData();
  }, [])

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['45%'], []);

  const openModal = (item) => {
    setCoinData(item);
    bottomSheetModalRef.current.present();
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currPrice={item.current_price}
              priceChangePerc={item.price_change_percentage_7d_in_currency}
              imgUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={ListHeaderItem}
        />
        <StatusBar style="auto" />
      </View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        {coinData ? (
          <Chart
            currPrice={coinData.current_price}
            imgUrl={coinData.image}
            name={coinData.name}
            symbol={coinData.symbol}
            priceChangePerc={coinData.price_change_percentage_7d_in_currency}
            sparkline={coinData.sparkline_in_7d.price}
          />
        )
          : null
        }
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  titleContainer: {
    marginTop: 40,
    paddingHorizontal: 16
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
