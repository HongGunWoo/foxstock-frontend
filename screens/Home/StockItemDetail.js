import React from 'react';
import { View } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';

const StockItemDetail = ({ item }) => {
	return (
		<View>
			<Headline style={{ color: 'black' }}>{item.item.name}</Headline>
			<Subheading style={{ color: 'black' }}>20,000</Subheading>
		</View>
	);
};

export default StockItemDetail;