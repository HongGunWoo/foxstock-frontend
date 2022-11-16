import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Headline, List, Snackbar, TextInput } from 'react-native-paper';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
})

const SignUp = () => {
	const navigation = useNavigation();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [checkPassword, setCheckPassword] = useState('');
	const [checkQuestion, setCheckQuestion] = useState('아이디/비밀번호를 찾기위한 질문을 골라주세요.')
	const [checkAnswer, setCheckAnswer] = useState('');
	const [expanded , setExpanded] = useState(false);
	const [checkSuccess, setCheckSuccess] = useState(false);

	const signUpUser = async (userInfo) => {
		const url = 'http://ykh8746.iptime.org:8080/signUp';
		return await axios
			.post(url, userInfo)
			.then((res) => setCheckSuccess(res.data));
	}

	const { mutate, data } = useMutation(
		signUpUser,
		{
			onSuccess: () => {
				setCheckSuccess(true);
			}
		}
	)

	return (
		<View style={styles.container}>
			<Snackbar 
				style={{backgroundColor: 'black'}}
				visible={checkSuccess}
				duration= {2000}
				onDismiss={() => {
					setCheckSuccess(false);
					navigation.navigate('Login');
				}}
			>회원가입 완료!</Snackbar>
			<Headline>
				여우의 주식 레시피를
			</Headline>
			<Headline>
				받아볼까요?
			</Headline>
			<TextInput
				label='이름'
				placeholder='이름을 입력해주세요'
				// activeUnderlineColor={theme.colors.red}
				value={name}
				onChangeText={(name) => setName(name)}
			/>

			<TextInput
				label='E-mail'
				placeholder='이메일을 입력해주세요'
				// activeUnderlineColor={theme.colors.red}
				keyboardType='email-address'
				value={email}
				onChangeText={(email) => setEmail(email)}
			/>

			<TextInput
				label='비밀번호'
				placeholder='비밀번호를 입력해주세요'
				// activeUnderlineColor={theme.colors.red}
				secureTextEntry
				value={password}
				onChangeText={(password) => setPassword(password)}
			/>

			<TextInput
				label='비밀번호 확인'
				placeholder='다시 한번 입력해 입력해주세요'
				// activeUnderlineColor={theme.colors.red}
				secureTextEntry
				value={checkPassword}
				onChangeText={(checkPassword) => setCheckPassword(checkPassword)}
			/>

			<List.Section>
				<List.Accordion
					title={checkQuestion}
					expanded={expanded}
					onPress={() => setExpanded(!expanded)}
				>
					<List.Item title="질문 질문" onPress={() => {
						setCheckQuestion("질문 질문");
						setExpanded(false);
					}}/>
				</List.Accordion>
			</List.Section>

			<TextInput
				label='답'
				placeholder='선택한 질문에 대한 답을 입력해주세요.'
				// activeUnderlineColor={theme.colors.red}
				value={checkAnswer}
				onChangeText={(checkAnswer) => setCheckAnswer(checkAnswer)}
			/>

			<Button
				mode='contained'
				disabled={checkSuccess}
				onPress={() => mutate({
					"name": name,
					"email": email,
					"password": password,
					"checkPassword": checkPassword,
					"userCheckQuestionNumber": 1,
					"userCheckQuestionAnswer": checkAnswer,
				})}
			>회원가입</Button>
		</View>
	);
};

export default SignUp;