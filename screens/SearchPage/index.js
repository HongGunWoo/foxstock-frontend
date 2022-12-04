import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Text, View, FlatList, StyleSheet, Modal } from 'react-native';
import { Provider } from 'react-native-paper';
import axios from 'axios';
import getEnvVars from '../../environment';
import { useIsFocused } from '@react-navigation/native';

import StockItem from '../Home/StockItem';
import FabUp from '../../components/FabUp';
import TableHeader from '../../components/TableHeader';
import StockItemDetail from '../Home/StockItemDetail';

const { apiUrl } = getEnvVars();

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	queryText: {
		paddingHorizontal: 30,
		paddingVertical: 10,
		flexDirection: 'row',
		borderBottomWidth: 1,
	}
})

const SearchPage = ({ route }) => {
	const isFocused = useIsFocused();
	const scrollRef = useRef();
	const [userInterest, setUserInterest] = useState([]);
	const [itemVisible, setItemVisible] = useState(false);
	const [detailItem, setDetailItem] = useState();


	const { mutate, isLoading: userLoading } = useMutation(
		['interestGet'],
		async (email) => {
			return await axios
				.post(`${apiUrl}/returnInterest2`, email)
				.then((res) => setUserInterest(res.data))
		}
	)

	const { data: userEmail, isLoading: emailLoading } = useQuery(
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

	const { isLoading, data } = useQuery(
		['search'],
		async () => {
			return await axios
				.get(`${apiUrl}/stock/search?query=${route.params.query}`)
				.then((res) => res.data.content);
		},
	)

	const showDetailModal = useCallback(() => setItemVisible(true));
	const hideDetailModal = (() => setItemVisible(false));

	const _keyExtractor = useCallback((item, index) => {
		return index.toString();
	})

	const _renderItem = useCallback((item) => {
		return <StockItem
			item={item}
			checkStar={userInterest.includes(item.item.srtnCd)}
			showModal={showDetailModal}
			setDetailItem={setDetailItem}
			userEmail={userEmail}
		/>;
	})

	useEffect(() => {
		if (userEmail !== null && userEmail !== undefined) {
			mutate({
				"email": userEmail
			});
		}
	}, [isFocused])


	if (isLoading || userLoading || emailLoading) {
		return null;
	}

	return (
		<Provider>
			<Modal transparent={true} visible={itemVisible} onRequestClose={hideDetailModal}>
				<StockItemDetail item={detailItem} hideDetailModal={hideDetailModal}/>
			</Modal>
			<View style={styles.container}>
				<View style={styles.queryText}>
					<Text style={{ fontWeight: 'bold' }}>
						"{route.params.query}"
					</Text>
					<Text>
						에 대한 검색 결과입니다.
					</Text>
				</View>
				<TableHeader>
					<FlatList
						ref={scrollRef}
						data={data}
						keyExtractor={_keyExtractor}
						renderItem={_renderItem}
					/>
				</TableHeader>
				<FabUp scrollRef={scrollRef} />
			</View>
		</Provider>
	);
};

export default SearchPage;