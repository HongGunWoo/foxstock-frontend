import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Button, IconButton, List, Snackbar, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import getEnvVars from '../../environment';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { apiUrl } = getEnvVars();
const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: 'white',
		paddingHorizontal: 30,
	},
	headline: {
		fontSize: 30,
		marginStart: 10
	},
	input: {
		backgroundColor: 'white',
		marginBottom: 5,
	},
	snackbar: {
		backgroundColor: 'black',
		alignSelf: 'center',
		textAlign: 'center',
	},
	button: {
		marginBottom: 30,
		borderRadius: 20,
		padding: 5,
	},
	modalView: {
		flex: 1,
		alignSelf: 'center',
		marginTop: 300,
		minHeight: 70,
		maxHeight: 100,
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
	snackbar: {
		backgroundColor: 'black',
		alignSelf: 'center',
		textAlign: 'center',
	},
})

const ChnagePW = () => {
	const navigation = useNavigation();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [checkSuccess, setCheckSuccess] = useState(false);


	const { mutate, data } = useMutation(
		['changePW'],
		async (userInfo) => {
			const url = `${apiUrl}/changePw`;
			return await axios
				.post(url, userInfo)
				.then((res) => {
					setCheckSuccess(res.data);
				});
		},
	)

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : null}
			style={{ flex: 1 }}
			keyboardVerticalOffset={StatusBarHeight + 44}
		>
			<ScrollView style={{ backgroundColor: 'white' }}>
				<TouchableWithoutFeedback onPress={Platform.OS === 'web' ? null : Keyboard.dismiss}>
					<View style={styles.container}>
						<Snackbar
							style={styles.snackbar}
							visible={checkSuccess}
							duration={3000}
							onDismiss={() => {
								setCheckSuccess(false);
								navigation.navigate('HomeStackScreen');
							}}
							>비밀번호 변경 완료!</Snackbar>
						<TextInput
							style={styles.input}
							label='E-mail'
							placeholder='이메일을 입력해주세요'
							left={<TextInput.Icon name="account" />}
							// activeUnderlineColor={theme.colors.red}
							keyboardType='email-address'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='Current Password'
							placeholder='현재 비밀번호를 입력해주세요'
							// activeUnderlineColor={}
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry
						/>

						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='New Password'
							placeholder='변경할 비밀번호를 입력해주세요'
							// activeUnderlineColor={}
							value={newPassword}
							onChangeText={(newPassword) => setNewPassword(newPassword)}
							secureTextEntry
						/>

						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='New Password Check'
							placeholder='변경할 비밀번호를 다시 입력해주세요'
							// activeUnderlineColor={}
							value={checkPassword}
							onChangeText={(checkPassword) => setCheckPassword(checkPassword)}
							secureTextEntry
						/>

						<Button
							style={styles.button}
							mode='contained'
							disabled={checkSuccess}
							onPress={() => mutate({
								"email": email,
								"nowPassword": password,
								"newPassword": newPassword,
								"checkNewPassword": checkPassword
							})}
						>
							비밀번호 변경
						</Button>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ChnagePW;