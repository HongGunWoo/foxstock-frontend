import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, LogBox, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Headline, HelperText, List, Snackbar, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import UserButton from '../../components/UserButton';
import getEnvVars from '../../environment';

LogBox.ignoreLogs(['500']);

const { apiUrl } = getEnvVars();
const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;
const QuestionList = ['내가 졸업한 초등학교는?', '내가 가장 아끼는 물건은?', '내가 가장 좋아하는 색깔은?', '내가 키우는 애완동물 이름은?']

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
		zIndex: 100,
	},
})

const SignUp = () => {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [checkQuestion, setCheckQuestion] = useState('ID/PW를 찾기위한 질문을 골라주세요.')
	const [checkAnswer, setCheckAnswer] = useState('');
	const [expanded, setExpanded] = useState(false);
	const [checkSuccess, setCheckSuccess] = useState(false);
	const [checkAnswerIdx, setCheckAnswerIdx] = useState();
	const [visibleError, setVisibleError] = useState(false);

	const { mutate } = useMutation(
		['signUp'],
		async (userInfo) => {
			const url = `${apiUrl}/signUp`;
			return await axios
				.post(url, userInfo)
				.then((res) => setCheckSuccess(res.data));
		},
		{
			onSuccess: () => {
				setCheckSuccess(true);
			},
			onError: () => {
				setVisibleError(true);
			}
		}
	)

	const hasEmailError = () => {
		var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return !reg.test(email);
	};

	const hasPasswordError = () => {
		return password === checkPassword
	}

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
							wrapperStyle={{
								alignSelf:'center',
							}}
							duration={1000}
							onDismiss={() => {
								setCheckSuccess(false);
								navigation.navigate('Login');
							}}
						>
							<Text style={{color: 'white'}}>
								회원가입 완료!
							</Text>
						</Snackbar>
						<Snackbar
							style={styles.snackbar}
							visible={visibleError}
							wrapperStyle={{
								alignSelf:'center',
							}}
							duration={1000}
							onDismiss={() => {
								setVisibleError(false);
							}}
						>
							<Text style={{color: 'white'}}>
								이미 가입되어 있는 이메일입니다.
							</Text>
						</Snackbar>
						<Headline style={styles.headline}>
							여우의
						</Headline>
						<Headline style={styles.headline}>
							주식 레시피를
						</Headline>
						<Headline style={styles.headline}>
							받아볼까요?
						</Headline>
						<TextInput
							style={styles.input}
							label='이름'
							placeholder='이름을 입력해주세요'
							value={name}
							onChangeText={(name) => setName(name)}
						/>

						<TextInput
							style={styles.input}
							label='E-mail'
							placeholder='이메일을 입력해주세요'
							keyboardType='email-address'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<HelperText type='error' visible={hasEmailError() && email !== ''}>
							이메일주소가 올바르지 않습니다.
						</HelperText>

						<TextInput
							style={styles.input}
							label='비밀번호'
							placeholder='비밀번호를 입력해주세요'
							secureTextEntry
							value={password}
							onChangeText={(password) => setPassword(password)}
						/>

						<TextInput
							style={{ ...styles.input, marginBottom: 0 }}
							label='비밀번호 확인'
							placeholder='다시 한번 입력해 입력해주세요'
							secureTextEntry
							value={checkPassword}
							onChangeText={(checkPassword) => setCheckPassword(checkPassword)}
						/>
						<HelperText type='error' visible={!hasPasswordError()}>
							비밀번호가 일치하지 않습니다.
						</HelperText>

						<List.Section>
							<List.Accordion
								title={checkQuestion}
								expanded={expanded}
								onPress={() => setExpanded(!expanded)}
							>
								{QuestionList.map((content, idx) => {
									return (<List.Item
										key={idx}
										title={content}
										onPress={() => {
											setCheckQuestion(content);
											setCheckAnswerIdx(idx);
											setExpanded(false);
										}} />)
								})}
							</List.Accordion>
						</List.Section>

						<TextInput
							style={{ ...styles.input, marginBottom: 30 }}
							label='답'
							placeholder='선택한 질문에 대한 답을 입력해주세요.'
							value={checkAnswer}
							onChangeText={(checkAnswer) => setCheckAnswer(checkAnswer)}
						/>
						<UserButton
							disabled={checkSuccess || name === '' || hasEmailError() || !hasPasswordError() || password === '' || checkAnswer === '' || checkAnswerIdx === undefined}
							onPress={() => mutate({
								"name": name,
								"email": email,
								"password": password,
								"checkPassword": checkPassword,
								"userCheckQuestionNumber": checkAnswerIdx,
								"userCheckQuestionAnswer": checkAnswer,
							})}
						>
							회원가입
						</UserButton>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default SignUp;