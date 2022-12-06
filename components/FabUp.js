import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const styles = StyleSheet.create({
	scrollTopBtn: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		margin: 16,
		backgroundColor: '#6937a1'
	},
})

const FabUp = ({scrollRef}) => {
	return (
		<FAB
			style={styles.scrollTopBtn}
			icon="chevron-up"
			onPress={() => {scrollRef.current.scrollToOffset({ animated: true, offset: 0 })}}

		/>
	);
};

export default FabUp;