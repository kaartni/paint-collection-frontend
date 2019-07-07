import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';
import config from '../config';

export default class PaintList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paints: []
		};

		this.getPaints = this.getPaints.bind(this);
	}
	componentWillMount() {
		this.getPaints();
	}

	getPaints() {
		axios
			.get(config.PREFIX + '/getpaints')
			.then(response => {
				this.setState({ paints: response.data });
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<View>
				{this.state.paints.map((v, i) => (
					<ListItem
						key={v.id}
						title={v.name}
						subtitle={v.type}
						leftAvatar={{
							size: 'small',
							title: v.amount.toString(),
							overlayContainerStyle: { backgroundColor: '#747474' }
						}}
						rightIcon={{
							name: 'edit',
							onPress: () => console.log(v)
						}}
					/>
				))}
			</View>
		);
	}
}
