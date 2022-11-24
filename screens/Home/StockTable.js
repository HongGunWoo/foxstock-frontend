import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import { Text, View, FlatList, ActivityIndicator, StyleSheet, Modal } from 'react-native';
import { Colors, Divider, FAB, IconButton, Provider } from 'react-native-paper';
import StockItem from './StockItem';
import axios from 'axios';
import getEnvVars from '../../environment';

const { apiUrl } = getEnvVars();

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'white',
		flex: 1,
	},
	tableHeader: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
	},
	headerContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	infoText: {
		flex: 1,
		alignSelf: 'center',
		textAlign: 'right'
	},
	infoIcon: {
		justifyContent: 'flex-start',
		margin: 0,
		padding: 0,
		marginStart: -4,
		marginTop: -3,
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

	modalView: {
		width: 250,
		height: 100,
		backgroundColor: "white",
		borderRadius: 20,
		paddingHorizontal: 10,
		justifyContent: 'center',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonClose: {
		alignSelf: 'flex-end',
		right: 0,
		top: 0,
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
	const [visible, setVisible] = useState(false);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [coordX, setCoordX] = useState(0);
	const [coordY, setCoordY] = useState(0);

	const showModal = (title, content) => {
		setTitle(title);
		setContent(content);
		setVisible(true);
	};
	const hideModal = () => setVisible(false);

	const { isLoading, data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
		[`infinite${PageList[props.route.name]}`, props.route.name],
		async ({ pageParam = 0 }) => {
			return await axios
				.get(`${apiUrl}/stock/${PageList[props.route.name]}?page=${pageParam}`)
				.then((res) => res.data);
		},
		{
			getNextPageParam: (lastPage, allPages) => {
				const maxPage = lastPage.totalPages;
				const nextPage = allPages.length + 1;
				return nextPage <= maxPage ? nextPage : undefined;
			},
		}
	);

	if (isLoading) {
		return null;
	}

	//종목이름, 현재가, 기대수익률
	return (
		<Provider>
			<Modal
				transparent={true}
				visible={visible}
				onRequestClose={hideModal}
			>
				<View style={{ ...styles.modalView, top: coordY, left: coordX - 250 }}>
					<View style={styles.modalHeader}>
						<Text style={{flex: 1, fontSize: 15, fontWeight: 'bold', marginLeft: 10}}>{title}</Text>
						<IconButton
							icon={'close'}
							style={styles.buttonClose}
							onPress={hideModal}
							color='black'
							size= {15}
						/>
					</View>
					<Text style={{paddingHorizontal: 10}}>{content}</Text>
				</View>
			</Modal>
			<View style={styles.container}>
				<View style={styles.tableHeader}>
					<Text style={{ flex: 1.2, textAlign: 'center' }}>종목명</Text>
					<Text style={{ flex: 1, textAlign: 'right' }}>현재가</Text>
					<View style={styles.headerContainer}>
						<Text style={styles.infoText}>{`추천\n구매가`}</Text>
						<IconButton
							style={styles.infoIcon}
							icon="information"
							color={Colors.black}
							size={10}
							onPress={(e) => {
								setCoordX(e.nativeEvent.pageX);
								setCoordY(e.nativeEvent.pageY);
								showModal('추천 구매가란?', '1년 후 약15% 수익을 얻기 위해 추천하는 매수 가격을 말해요.');
							}
							}
						/>
					</View>
					<View style={{ ...styles.headerContainer, flex: 0.8 }}>
						<Text style={styles.infoText}>{`예상\n수익률`}</Text>
						<IconButton
							style={styles.infoIcon}
							icon="information"
							color={Colors.black}
							size={10}
							onPress={(e) => {
								setCoordX(e.nativeEvent.pageX);
								setCoordY(e.nativeEvent.pageY);
								showModal('예상 수익률이란?', '현재가에서 매수했을 경우 1년 후 예상되는 수익률을 말해요.');
							}
							}
						/>
					</View>
					<View style={{ flex: 0.4 }} />
				</View>
				<Divider style={{ backgroundColor: 'black' }} />
				<FlatList
					ref={scrollRef}
					data={data.pages.map(page => page.content).flat()}
					keyExtractor={(item, index) => {
						return index.toString();
					}}
					renderItem={(item) => {
						return (
							<StockItem item={item} />
						)
					}}
					onEndReached={() => {
						if (hasNextPage) {
							fetchNextPage();
						}
					}}
					onEndReachedThreshold={0.3}
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