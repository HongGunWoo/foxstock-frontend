import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Modal, Platform, ScrollView, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { HelperText, IconButton, List, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import getEnvVars from '../../environment';
import UserButton from '../../components/UserButton';

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
	input: {
		backgroundColor: 'white',
		marginBottom: 5,
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
})

const FindPW = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkQuestion, setCheckQuestion] = useState('가입 시 설정한 질문을 골라주세요.')
	const [checkAnswer, setCheckAnswer] = useState('');
	const [expanded, setExpanded] = useState(false);
	const [checkAnswerIdx, setCheckAnswerIdx] = useState();
	const [visible, setVisible] = useState(false);

	const { mutate } = useMutation(
		['findPW'],
		async (userInfo) => {
			const url = `${apiUrl}/findPw`;
			return await axios
				.post(url, userInfo)
				.then((res) => {
					setPassword(res.data);
					setVisible(true);
				});
		},
	)

	const hideModal = () => setVisible(false);

	const hasEmailError = () => {
		var reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return !reg.test(email);
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
						<Modal
							transparent={true}
							visible={visible}
							onRequestClose={hideModal}
						>
							<View style={styles.modalView}>
								{password !== '입력 정보를 찾을 수 없습니다.' ?
									<View style={styles.modalHeader}>
										<View flexDirection='column'>
											<Text style={{ marginLeft: 10, textAlign: 'center' }}>
												{`${email}의\n임시 비밀번호는`}
											</Text>
											<Text selectable style={{ fontSize: 15, fontWeight: 'bold', paddingHorizontal: 10, textAlign: 'center' }}>{`${password}`}</Text>
											<Text style={{ textAlign: 'center' }}>입니다.</Text>
										</View>
										<IconButton
											icon={'close'}
											onPress={hideModal}
											color='black'
											size={15}
										/>
									</View>
									:
									<View style={styles.modalHeader}>
										<Text style={{ fontSize: 15, fontWeight: 'bold', paddingHorizontal: 10, textAlign: 'center' }}>{password}</Text>
										<IconButton
											icon={'close'}
											onPress={hideModal}
											color='black'
											size={15}
										/>
									</View>
								}
							</View>
						</Modal>
						<TextInput
							style={styles.input}
							label='E-mail'
							placeholder='이메일을 입력해주세요'
							keyboardType='email-address'
							value={email}
							onChangeText={(email) => setEmail(email)}
						/>
						<HelperText style={styles.helperText} type='error' visible={hasEmailError() && email !== ''}>
							이메일주소가 올바르지 않습니다.
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
							disabled={hasEmailError() || checkAnswerIdx === undefined || checkAnswer === ''}
							onPress={() => mutate({
								"email": email,
								"userCheckQuestionNumber": checkAnswerIdx,
								"userCheckQuestionAnswer": checkAnswer,
							})}
						>
							비밀번호 찾기
						</UserButton>
					</View>
				</TouchableWithoutFeedback>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default FindPW;