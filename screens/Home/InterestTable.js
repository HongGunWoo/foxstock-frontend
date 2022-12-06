import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {  FlatList, Modal } from 'react-native';
import { Provider } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

import StockItem from './StockItem';
import getEnvVars from '../../environment';
import StockItemDetail from './StockItemDetail';
import TableHeader from '../../components/TableHeader';
import FabUp from '../../components/FabUp';

const { apiUrl } = getEnvVars();

const InterestTable = () => {
	const isFocused = useIsFocused();
	const scrollRef = useRef();
	const [itemVisible, setItemVisible] = useState(false);
	const [detailItem, setDetailItem] = useState();

	const { mutate, isLoading: userLoading, data } = useMutation(
		['interestTableGet'],
		async (email) => {
			return await axios
				.post(`${apiUrl}/returnInterest`, email)
				.then((res) => res.data)
		}
	)
	
	const { mutate: interestMutate } = useMutation(
		['interest'],
		async (stockInfo) => {
			const { email, srtnCd, checkStock, setCheckStock } = stockInfo;
			return await axios
				.post(`${apiUrl}/${checkStock ? 'deleteInterest' : 'addInterest'}`, {email, srtnCd})
				.then((res) => res.data ? setCheckStock(true) : setCheckStock(false));
		},
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

	useEffect(() => {
		if (userEmail !== null && userEmail !== undefined) {
			mutate({
				"email": userEmail
			});
		}
	}, [isFocused])


	const showDetailModal = useCallback(() => setItemVisible(true));
	const hideDetailModal = (() => setItemVisible(false));

	const _keyExtractor = useCallback((item, index) => {
		return index.toString();
	})

	const handleOnPress = useCallback((item) => {
		showDetailModal();
		setDetailItem(item);
	})

	const _renderItem = useCallback((item) => {
		return <StockItem
			item={item}
			checkStar={true}
			handleOnPress={handleOnPress}
			userEmail={userEmail}
			mutate={interestMutate}
		/>;
	})

	if (userLoading || emailLoading) {
		return null;
	}

	if (userEmail === null && userEmail === undefined) {
		return null;
	}

	return (
		<Provider>
			<Modal transparent={true} visible={itemVisible} onRequestClose={hideDetailModal}>
				<StockItemDetail item={detailItem} hideDetailModal={hideDetailModal}/>
			</Modal>
			<TableHeader>
				<FlatList
					ref={scrollRef}
					data={data}
					keyExtractor={_keyExtractor}
					renderItem={_renderItem}
				/>
				<FabUp scrollRef={scrollRef}/>
			</TableHeader>
		</Provider>
	)
};

export default InterestTable;