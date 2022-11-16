import React from 'react';
import { View } from 'react-native';
import { Colors, Headline, Subheading } from 'react-native-paper';

const StockItemDetail = ({ item }) => {
	return (
		<View>
			<Headline style={{ color: Colors.black }}>{item.item.name}</Headline>
			<Subheading style={{ color: Colors.black }}>20,000</Subheading>
		</View>
	);
};

export default StockItemDetail;