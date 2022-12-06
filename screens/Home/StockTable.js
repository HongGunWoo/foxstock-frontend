import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, Modal } from 'react-native';
import { Provider } from 'react-native-paper';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

import FabUp from '../../components/FabUp';
import StockItem from './StockItem';
import ListIndicator from '../../components/ListIndicator';
import getEnvVars from '../../environment';
import StockItemDetail from './StockItemDetail';
import TableHeader from '../../components/TableHeader';


const { apiUrl } = getEnvVars();

const PageList = {
	"전체": "all",
	"KOSPI": "kospi",
	"KOSDAQ": "kosdaq",
}

const StockTable = memo((props) => {
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

	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		[`infinite${PageList[props.route.name]}`, props.route.name],
		async ({ pageParam = 0 }) => {
			return await axios
				.get(`${apiUrl}/stock/${PageList[props.route.name]}?page=${pageParam}`)
				.then((res) => { return res.data; })
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				const maxPage = lastPage.totalPages;
				const nextPage = allPages.length + 1;
				return nextPage <= maxPage ? nextPage : undefined;
			},
		}
	);

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

	const { mutate: interestMutate } = useMutation(
		['interest'],
		async (stockInfo) => {
			const { email, srtnCd, checkStock, setCheckStock } = stockInfo;
			return await axios
				.post(`${apiUrl}/${checkStock ? 'deleteInterest' : 'addInterest'}`, { email, srtnCd })
				.then((res) => res.data ? setCheckStock(true) : setCheckStock(false));
		},
	)

	useEffect(() => {
		if (userEmail !== null && userEmail !== undefined) {
			mutate({
				"email": userEmail
			});
		}
	}, [isFocused])

	const _keyExtractor = useCallback((item, index) => {
		return index.toString();
	})

	const showDetailModal = useCallback(() => setItemVisible(true));
	const hideDetailModal = (() => setItemVisible(false));

	const handleOnPress = useCallback((item) => {
		showDetailModal();
		setDetailItem(item);
	})

	const _renderItem = useCallback((item) => {
		return <StockItem
			item={item}
			checkStar={userInterest.includes(item.item.srtnCd)}
			handleOnPress={handleOnPress}
			userEmail={userEmail}
			mutate={interestMutate}
		/>;
	})

	const _onEndReached = useCallback(() => {
		if (hasNextPage) {
			fetchNextPage();
		}
	})

	return (
		<Provider>
			<Modal transparent={true} visible={itemVisible} onRequestClose={hideDetailModal}>
				<StockItemDetail item={detailItem} hideDetailModal={hideDetailModal} />
			</Modal>
			<TableHeader>
				{isLoading || userLoading || emailLoading ? null :
					<>
						<FlatList
							ref={scrollRef}
							data={data.pages.map(page => page.content).flat()}
							removeClippedSubviews={false}
							disableVirtualization={false}
							keyExtractor={_keyExtractor}
							renderItem={_renderItem}
							onEndReached={_onEndReached}
							onEndReachedThreshold={0.2}
							ListFooterComponent={isFetchingNextPage ? <ListIndicator /> : null}
						/>
						<FabUp scrollRef={scrollRef} />
					</>
				}
			</TableHeader>
		</Provider>
	)
});

export default StockTable;