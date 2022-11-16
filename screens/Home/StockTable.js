import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { Divider, FAB, Provider } from 'react-native-paper';
import StockItem from './StockItem';
import axios from 'axios';

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	tableHeader: {
		flexDirection: 'row',
		marginVertical: 10
	},
	item: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	scrollTopBtn: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 16,
	},
})

const PageList = {
	"전체": "all",
	"KOSPI": "kospi",
	"KOSDAQ": "kosdaq",
	"관심": "returnInterest",
}

const StockTable = (props) => {
	const scrollRef = useRef();

	const fetchRepo = async (page) => {
		return await axios
			.get(`http://ykh8746.iptime.org:8080/stock/${PageList[props.route.name]}?page=${page}`)
			.then((res) => res.data);
	}

	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		[PageList[props.route.name]],
		async ({ pageParam = 0 }) => {
			return await fetchRepo(pageParam);
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				const maxPage = lastPage.totalPages;
				const nextPage = allPages.length + 1;
				return nextPage <= maxPage ? nextPage : undefined;
			},
		}
	);

	const todoItemExtractorKey = (item, index) => {
		return index.toString();
	}

	const renderData = item => {
		return (
			<StockItem item={item} />
		)
	}

	const loadMore = () => {
		if (hasNextPage) {
			fetchNextPage();
		}
	}

	if (isLoading) {
		return null;
	}

	//종목이름, 현재가, 기대수익률
	return (
		<Provider>
			<View style={styles.container}>
				<View style={styles.tableHeader}>
					<Text style={{ flex: 1.5, textAlign: 'center' }}>종목명</Text>
					<Text style={{ flex: 1, textAlign: 'right' }}>현재가</Text>
					<Text style={{ flex: 1, textAlign: 'right' }}>추천 구매가</Text>
					<Text style={{ flex: 1, textAlign: 'right' }}>예상 수익률</Text>
					<View style={{ flex: 0.5 }} />
				</View>
				<Divider style={{ backgroundColor: 'black' }} />
				<FlatList
					ref={scrollRef}
					data={data.pages.map(page => page.content).flat()}
					keyExtractor={todoItemExtractorKey}
					renderItem={renderData}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={isFetchingNextPage
						? <ActivityIndicator size='small' color='#E84545' />
						: null}
				/>
				<FAB
					style={styles.scrollTopBtn}
					icon="chevron-up"
					onPress={() => { scrollRef.current.scrollToIndex({ index: 0 }) }}
				/>
			</View>
		</Provider>
	)
};

export default StockTable;