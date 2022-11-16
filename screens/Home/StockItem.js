import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { IconButton, Colors, Portal, Modal } from 'react-native-paper';
import StockItemDetail from './StockItemDetail';

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
		margin: 10,
		// marginTop: 0,
		borderRadius: 50
	}
})

const StockItem = ({ item }) => {
	const [iconName, setIconName] = useState('star-outline')
	const [visible, setVisible] = useState(false);
	const [checkStock, setCheckStock] = useState(false);
	const { data: userEmail } = useQuery(['userEmail'], {
		initalData: false,
		staleTime: Infinity,
	});

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const setInterestStock = async (stockInfo) => {
		let delOrAdd = 'addInterest'
		checkStock ? delOrAdd = 'deleteInterest' : delOrAdd = 'addInterest'
		return await axios
			.post(`http://ykh8746.iptime.org:8080/${delOrAdd}`, stockInfo)
			.then((res) => setCheckStock(res.data));
	}

	useEffect(() => {
		checkStock ? setIconName('star') : setIconName('star-outline');
	}, [checkStock])

	const { mutate, data } = useMutation(
		['interest'],
		async (stockInfo) => {
			let delOrAdd = 'addInterest'
			checkStock ? delOrAdd = 'deleteInterest' : delOrAdd = 'addInterest'
			return await axios
				.post(`http://ykh8746.iptime.org:8080/${delOrAdd}`, stockInfo)
				.then((res) => setCheckStock(res.data));
		},
	)

	return (
		<>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
					<StockItemDetail item={item} />
				</Modal>
			</Portal>
			<View style={styles.item}>
				<Text style={{ flex: 1.5, textAlign: 'center' }} onPress={showModal}>{item.item.name}</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={showModal}>{item.item.currentPrice}</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={showModal}>{item.item.purchasePrice}</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={showModal}>{item.item.expectedReturn}</Text>
				<IconButton
					style={{ flex: 0.4 }}
					icon={iconName}
					color={Colors.yellow700}
					onPress={() => mutate({
						"email": userEmail,
						"srtnCd": item.item.srtnCd
					})}
				/>
			</View>
		</>
	);
};

export default StockItem;