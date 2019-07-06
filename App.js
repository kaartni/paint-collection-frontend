import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';
import PaintList from './components/PaintList';

export default class App extends Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<Header
					containerStyle={{
						backgroundColor: 'black'
					}}
					centerComponent={{ text: 'Paint collection', style: { color: 'white', fontSize: 20 } }}
				/>
				<PaintList />
			</View>
		);
	}
}
