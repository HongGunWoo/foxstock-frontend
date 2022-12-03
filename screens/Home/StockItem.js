import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { IconButton, Colors, Portal, Modal, Divider } from 'react-native-paper';

import StockItemDetail from './StockItemDetail';
import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();

const styles = StyleSheet.create({
	stockItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalContainer: {
		flex: 1,
		backgroundColor: 'white',
		margin: 10,
		borderRadius: 50
	}
})

const StockItem = ({ item, checkStar }) => {
	const [iconName, setIconName] = useState('star-outline')
	const [visible, setVisible] = useState(false);
	const [checkStock, setCheckStock] = useState(checkStar);
	const { data: userEmail } = useQuery(
		['userEmail'],
		() => {
			if (userEmail !== undefined) {
				return userEmail
			}
			return null;
		},
		{
			initalData: false,
			staleTime: Infinity,
		});

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	useEffect(() => {
		checkStock ? setIconName('star') : setIconName('star-outline');
	}, [checkStock])

	const { mutate, data } = useMutation(
		['interest'],
		async (stockInfo) => {
			let delOrAdd = 'addInterest'
			checkStock ? delOrAdd = 'deleteInterest' : delOrAdd = 'addInterest'
			return await axios
				.post(`${apiUrl}/${delOrAdd}`, stockInfo)
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
			<View style={styles.stockItem}>
				<Text style={{ flex: 1.25, textAlign: 'center' }} onPress={showModal}>
					{item.item.name.length > 8 ? item.item.name.substr(0, 7) + '...' : item.item.name}
				</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={showModal}>{item.item.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
				<Text style={{ flex: 1, textAlign: 'right' }} onPress={showModal}>{item.item.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Text>
				<Text style={{ flex: 0.8, textAlign: 'right' }} onPress={showModal}>
					{item.item.expectedReturn >= 1 ? Math.round(item.item.expectedReturn * 100 - 100) + '%' :
						Math.round((1 - item.item.expectedReturn) * -100) + '%'}
				</Text>
				<IconButton
					style={{ flex: 0.4 }}
					icon={iconName}
					color={Colors.yellow700}
					onPress={() => {
						userEmail !== null ?
							mutate({
							"email": userEmail,
							"srtnCd": item.item.srtnCd
						}) : console.log("로그인 필요")
					}}
				/>
			</View>
			<Divider style={{backgroundColor: Colors.grey200}}/>
		</>
	);
};

export default StockItem;