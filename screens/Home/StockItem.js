import React, { memo, useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton, Colors, Divider } from 'react-native-paper';

const styles = StyleSheet.create({
	stockItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
})

const StockItem = ({ item, checkStar, handleOnPress, userEmail, mutate }) => {
	const [iconName, setIconName] = useState('star-outline')
	const [checkStock, setCheckStock] = useState(checkStar);

	useEffect(() => {
		checkStock ? setIconName('star') : setIconName('star-outline');
	}, [checkStock])

	return (
		<>
			<View style={styles.stockItem}>
				<Text style={{ flex: 1.25, textAlign: 'center' }} onPress={() => handleOnPress(item)}>
					{item.item.name.length > 8 ? item.item.name.substr(0, 7) + '...' : item.item.name}
				</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={() => handleOnPress(item)}>{item.item.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={() => handleOnPress(item)}>{item.item.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
				<Text style={{ flex: 0.8, textAlign: 'right' }} onPress={() => handleOnPress(item)}>
					{item.item.expectedReturn >= 1 ? Math.round(item.item.expectedReturn * 100 - 100) + '%' :
						Math.round((1 - item.item.expectedReturn) * -100) + '%'}
				</Text>
				{userEmail !== null ?
					<IconButton
						style={{ flex: 0.4 }}
						icon={iconName}
						color={Colors.yellow700}
						onPress={() => {
							userEmail !== null ?
								mutate({
									"email": userEmail,
									"srtnCd": item.item.srtnCd,
									"checkStock": checkStock,
									"setCheckStock": setCheckStock
								})
								: null
						}}
					/> :
					<IconButton
						style={{ flex: 0.4 }}
						icon={iconName}
						color={Colors.grey500}
					/>
				}

			</View>
			<Divider style={{ backgroundColor: Colors.grey200 }} />
		</>
	);
};

export default memo(StockItem);