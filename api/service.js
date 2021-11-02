import axios from 'axios';
import moment from 'moment';

const API = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d'

const formatSparkline = (numbers) => {
    const s7a = moment().subtract(7, 'days').unix();
    let formattedSparkline = numbers.map((item, index) => {
        return {
            x: s7a + (index + 1) * 3600,
            y: item
        }
    })
    return formattedSparkline;
}

const formatMarketData = (data) => {
    let formattedData = [];
    data.forEach(item => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price)
        const formattedItem = {
            ...item,
            sparkline_in_7d: {
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem);
    })
    return formattedData;
}

export const getMarket = async () => {
    try {
        const res = await axios.get(API);
        const data = res.data;
        const formatData = formatMarketData(data);
        return formatData;
    } catch (e) {
        console.log(e);
    }
}