import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
	background-color: #FFF;
	flex: 1;
	justify-content: center;
	align-items: center;
`;
export const InputArea = styled.View`
	width: 100%;
	padding: 40px;
`;
export const CustomButton= styled.TouchableOpacity`
	height: 60px;
	border-radius: 30px;
	justify-content: center;
	align-items: center;
	background-color: #C90100;
`;
export const CustomButtonText= styled.Text`
	font-size: 18px;
	color: #FFF;
	font-weight: bold;
`;