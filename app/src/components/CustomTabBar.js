import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import styled from 'styled-components/native';

import SvgExit from '../assets/exit.svg';
import SvgWork from '../assets/work.svg';
import SvgHome from '../assets/home.svg';
import SvgUser from '../assets/user.svg';

const TabArea = styled.View`
	height: 60px;
	background-color: #9E0000;
	flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
	flex: 1;
	justify-content: center;
	align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
	width: 70px;
	height: 70px;
	justify-content: center;
	align-items: center;
	background-color: #FFF;
	border-radius: 30px;
	border: 3px solid #9E0000;
	margin-top: -20px;
`;
const ImageIcon = styled.Image`
	width: 24px;
	height: 24px;
	border-radius: 12px;
`;

export default ({ state, navigation }) => {
	const { state:user } = useContext(UserContext);

	const goTo = (screenName) => {
		navigation.navigate(screenName);
	};

	return (
		<TabArea>
			<TabItem onPress={() => goTo('SingUp')}>
				{user
				?	<SvgExit style={{opacity: state.index === 2 ? 1 : 0.8}} width='24' height='24' />
				: <SvgWork style={{opacity: state.index === 2 ? 1 : 0.8}} width='24' height='24' />}
			</TabItem>
			<TabItemCenter onPress={() => goTo('Home')}>
				<SvgHome width='32' height='32' />
			</TabItemCenter>
			<TabItem onPress={() => goTo('SingIn')}>
				{user
				?	<ImageIcon source={{uri: user.image}} />
				:	<SvgUser style={{opacity: state.index === 1 ? 1 : 0.8}} width='24' height='24' />}
			</TabItem>
		</TabArea>
	);
};