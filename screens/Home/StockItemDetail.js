import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Headline, IconButton, Subheading, Text } from 'react-native-paper';
import ListIndicator from '../../components/ListIndicator';
import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();
const dimensions = Dimensions.get('window');


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#e9e9e9',
		marginTop: 100,
		marginBottom: 60,
		marginHorizontal: 20,
		borderRadius: 10,
		padding: 20,
	},
	buttonClose: {
		margin: 0,
		padding: 0
	},
	graph: {
		flex: 1,
		marginVertical: 10
	},
	modalText: {
		color: 'black'
	}
})

const StockItemDetail = ({ item, hideDetailModal }) => {

	const { data, isLoading, isFetching } = useQuery(
		['stockDetail'],
		async () => {
			return await axios
				.get(`${apiUrl}/stock/detail?name=${item.item.name}&srtn_cd=${item.item.srtnCd}`)
				.then((res) => res.data);
		}
	)

	if (isLoading) {
		return <View style={styles.container} />
		;
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				{isFetching ? <Subheading style={{ ...styles.modalText, flex: 1 }}>...</Subheading> :
					<Subheading style={{ ...styles.modalText, flex: 1 }}>{data.type}</Subheading>}
				<IconButton
					icon={'close'}
					style={styles.buttonClose}
					onPress={hideDetailModal}
					color='black'
					size={20}
				/>
			</View>
			<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
				<Headline style={{ ...styles.modalText, marginRight: 10 }} selectable>{item.item.name}</Headline>
				<Subheading style={{ ...styles.modalText, marginRight: 10 }} selectable>{item.item.srtnCd}</Subheading>
				<Subheading style={styles.modalText} selectable>{item.item.mrktCtg}</Subheading>
			</View>
			<Divider style={{ backgroundColor: '#bababa', marginVertical: 10 }} />
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ ...styles.modalText, marginRight: 10 }}>
					BPS: {item.item.bps.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
				</Text>
				<Text style={{ ...styles.modalText, marginRight: 10 }}>
					ROE: {Math.round(item.item.averageRoe * 100 - 100)}%
				</Text>
				<Text style={styles.modalText}>PBR: {item.item.pbr}</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Text style={{ ...styles.modalText, marginRight: 10 }}>
					현재가: {item.item.currentPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
				</Text>
				<Text style={styles.modalText}>
					예상 수익률: {item.item.expectedReturn >= 1 ? Math.round(item.item.expectedReturn * 100 - 100) + '%' :
						Math.round((1 - item.item.expectedReturn) * -100) + '%'}
				</Text>
			</View>
			<Text style={{ ...styles.modalText, fontWeight: 'bold' }}>
				추천 구매가: {item.item.purchasePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
			</Text>
			{isFetching ? <Image resizeMode='contain' style={styles.graph} /> :
				<Image resizeMode='contain' style={styles.graph} source={{ uri: data.chart }} />}
			<ScrollView style={{ flex: 1 }}>
				{isFetching ? <ListIndicator /> : 
				<Text style={styles.modalText} >{data.info}</Text>}
			</ScrollView>
		</View>
	);
};

export default StockItemDetail;