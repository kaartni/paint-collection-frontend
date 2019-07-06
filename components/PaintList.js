import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import axios from 'axios';
import config from '../config';

export default class PaintList extends Component {
	constructor(props) {
		super(props);
		this.state = {};

		this.getPaints = this.getPaints.bind(this);
	}
	componentWillMount() {
		this.getPaints();
	}

	getPaints() {
		axios
			.get(config.PREFIX + '/getpaints')
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Hello, world!</Text>
				<Button />
			</View>
		);
	}
}
