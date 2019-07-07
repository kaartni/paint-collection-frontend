import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';

export default class EditPaint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paint: this.props.paint,
			isVisible: this.props.isVisible
		};
	}

	render() {
		console.log(this.state.paint);
		return (
			<Overlay
				isVisible={this.state.isVisible}
				onBackdropPress={() => {
					this.setState({ isVisible: false });
					this.props.toggleEditOverlay();
				}}
				windowBackgroundColor="rgba(255, 255, 255, .5)"
				width="auto"
				height="auto"
			>
				<Text>Hello from Overlay!</Text>
			</Overlay>
		);
	}
}
