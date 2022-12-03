import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
	button: {
		marginBottom: 10,
		borderRadius: 20,
		padding: 5,
	},
})

const UserButton = (props) => {
	return (
		<Button
			style={styles.button}
			mode='contained'
			color='#6937a1'
			onPress={props.onPress}
			disabled={props.disabled}
		>
			{props.children}
		</Button>
	);
};

export default UserButton;