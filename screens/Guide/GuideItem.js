import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text, Title } from 'react-native-paper';

const styles = StyleSheet.create({
	contentContainer: {
		backgroundColor: '#e9e9e9',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		marginBottom: 10,
	}
})

const GuideItem = (props) => {
	const [iconName, setIconName] = useState('chevron-down');
	const [contentEnable, setContentEnable] = useState(false);
	const iconChange = () => {
		iconName === 'chevron-up' ? setIconName('chevron-down') : setIconName('chevron-up');
	}

	return (
		<>
			<View style={{ flexDirection: 'row'}}>
				<Title style={{ fontWeight: 'bold' }}
					onPress={() => {
						iconChange();
						setContentEnable(!contentEnable);
					}}
				>
					{props.title}
				</Title>
				<IconButton
					icon={iconName}
					onPress={() => {
						iconChange();
						setContentEnable(!contentEnable);
					}}
					color='black'
					size={20}
				/>
			</View>
			{contentEnable ?
				<View style={styles.contentContainer}>
					<Text>
						{props.content}
					</Text>
				</View> :	null
			}
		</>
	);
};

export default GuideItem;