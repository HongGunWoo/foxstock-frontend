import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { HelperText, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import getEnvVars from '../../environment';
import UserButton from '../../components/UserButton';

const { apiUrl } = getEnvVars();
const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		backgroundColor: 'white',
		paddingHorizontal: 30,
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
	helperText: {
		marginTop: 0,
		marginLeft: 20
	}
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

	const hasEmailError = () => {
		var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return !reg.test(email);
	};

	const hasPasswordError = () => {
		return newPassword === checkPassword
	};

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
							>
								비밀번호 변경 완료!
							</Snackbar>
						<TextInput
							style={styles.input}
							label='E-mail'
							placeholder='이메일을 입력해주세요'
							left={<TextInput.Icon name="account" />}
							keyboardType='email-address'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<HelperText style={styles.helperText} type='error' visible={hasEmailError() && email !== ''}>
							이메일주소가 올바르지 않습니다.
						</HelperText>

						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='Current Password'
							placeholder='현재 비밀번호를 입력해주세요'
							value={password}
							onChangeText={(password) => setPassword(password)}
							secureTextEntry
						/>

						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='New Password'
							placeholder='변경할 비밀번호를 입력해주세요'
							value={newPassword}
							onChangeText={(newPassword) => setNewPassword(newPassword)}
							secureTextEntry
						/>

						<TextInput
							style={styles.input}
							left={<TextInput.Icon name="lock" />}
							label='New Password Check'
							placeholder='변경할 비밀번호를 다시 입력해주세요'
							value={checkPassword}
							onChangeText={(checkPassword) => setCheckPassword(checkPassword)}
							secureTextEntry
						/>
						<HelperText type='error' visible={!hasPasswordError()}>
							비밀번호가 일치하지 않습니다.
						</HelperText>

						<UserButton
							disabled={checkSuccess || email === '' || hasEmailError() || !hasPasswordError() || password === ''}
							onPress={() => mutate({
								"email": email,
								"nowPassword": password,
								"newPassword": newPassword,
								"checkNewPassword": checkPassword
							})}
						>
							비밀번호 변경
						</UserButton>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default ChnagePW;