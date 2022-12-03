import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, Headline, IconButton, Text } from 'react-native-paper';

import GuideItem from './GuideItem';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingHorizontal: 30,
		paddingVertical: 40,
	},
	headline: {
		fontSize: 30,
	},
	contentContainer: {
		backgroundColor: '#e9e9e9',
		paddingVertical: 15,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginBottom: 10,
	}
})

const Guide = () => {

	return (
		<ScrollView style={{ backgroundColor: 'white' }}>
			<View style={styles.container}>
				<Headline style={{ ...styles.headline, marginTop: 30 }}>
					여우의 주식 레시피를
				</Headline>
				<Headline style={styles.headline}>
					이렇게 사용해요!
				</Headline>

				<Divider style={{ marginVertical: 20 }} />

				<View style={styles.contentContainer}>
					<IconButton
						icon="alert"
						color='red'
						size={30}
						style={{padding:0, margin: 0}}
					/>
					<Text>
						{`추천 구매가와 예상 수익률은 "여우의 주식레시피"에서 예상하는 값으로 항상 정확한 값이 아닌 대략적인 예상치를 표현해요.
						\n신생 기업, 작년 비정상적인 매출액 등 여러 요인으로 인해 주식이 고평가되는 경우가 있으니 추천 구매가와 예상 수익률로만 구매를 결정하기보단	투자 종목을 고르는데 참고하는 용도로만 사용해요!`}
					</Text>
				</View>




				<GuideItem
					title="추천 구매가란?"
					content={`(BPS * ROE^10)/목표 수익률^10 = 추천 구매가\n위와 같은 계산을 통해 나온 값으로 1년 후 약 15% 수익을 얻기 위해 추천하는 매수 가격을 말해요.`}
				/>
				<Divider style={{ backgroundColor: 'white', marginVertical: 5 }} />

				<GuideItem
					title="예상 수익률이란?"
					content={`ROE^10 / PBR = 예상 수익률^10\n위와 계산을 통해 나온 값으로 현재가에서 매수했을 경우 1년 후 예상되는 수익률을 말해요.`}
				/>
				<Divider style={{ backgroundColor: 'white', marginVertical: 5 }} />

				<GuideItem
					title="BPS(Book-value Per Share)란?"
					content="주당순자산가치로 현재 시점에서 기업의 활동을 중단시키고 그 부를 모든 주주들에게 나눠줄 경우 한 주당 얼마씩 돌아가는가를 나타내는 수치를 말해요. 즉 회사의 순자산을
					회사간 발행한 총 주식수로 나눈 값을 말해요."
				/>
				<Divider style={{ backgroundColor: 'white', marginVertical: 5 }} />

				<GuideItem
					title="ROE(Return On Equity)란?"
					content="자기자본이익률로 기업이 자본을 이용하여 얼마만큼의 이익을 냈는지를 나타내는 지표를 말해요. 즉 당기순이익을 자기자본으로 나눈 것으로 만약 자기자본이 1000원, 당기순이익이 100원이라면 ROE는 10% 랍니다."
				/>
				<Divider style={{ backgroundColor: 'white', marginVertical: 5 }} />

				<GuideItem
					title="PBR(Price Book-value Ratio)란?"
					content="주가순자신비율로 주가를 주당순자산가치(BPS)로 나눈 비율을 말해요. 즉 PBR = 현재 주가/BPS = 시가총액/순자산 이랍니다. 만약 PBR이 2라면 회사가 망했을 때 10원을 받을 수 있는 주식이 20원에 거래되고 있다는 것을 의미해요."
				/>
				<Divider style={{ backgroundColor: 'white', marginVertical: 5 }} />


			</View>
		</ScrollView>
	);
};

export default Guide;