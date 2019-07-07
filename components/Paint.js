import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Overlay, Icon, Input, Text, Divider } from 'react-native-elements';
import config from '../config';
import axios from 'axios';

export default class Paint extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: this.props.isVisible,
			id: this.props.paint.id,
			name: this.props.paint.name,
			type: this.props.paint.type,
			amount: this.props.paint.amount
		};

		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.updatePaint = this.updatePaint.bind(this);
		this.deletePaint = this.deletePaint.bind(this);
		this.closeOverlay = this.closeOverlay.bind(this);
	}

	handleFieldChange(property, event) {
		this.setState({ [property]: event.nativeEvent.text });
	}

	deletePaint() {
		let body = {};
		body.id = this.state.id;
		body.token = config.TOKEN;
		const url = config.PREFIX + '/deletepaint';
		console.log(url);
		axios({
			method: 'post',
			url: url,
			data: body
		})
			.then(() => {
				this.closeOverlay();
			})
			.catch(error => {
				console.log(error);
			});
	}

	updatePaint() {
		let body = {};
		body.id = this.state.id;
		body.name = this.state.name;
		body.type = this.state.type.toUpperCase();
		body.amount = this.state.amount;
		body.token = config.TOKEN;
		const url = config.PREFIX + '/updatepaint';
		console.log(url);
		axios({
			method: 'post',
			url: url,
			data: body
		})
			.then(response => {
				console.log(response.status);
				this.closeOverlay();
			})
			.catch(error => {
				console.log(error);
			});
	}

	addPaint() {
		let body = {};
		body.name = this.state.name;
		body.type = this.state.type.toUpperCase();
		body.amount = this.state.amount;
		body.token = config.TOKEN;
		const url = config.PREFIX + '/addpaint';
		console.log(url);
		axios({
			method: 'post',
			url: url,
			data: body
		})
			.then(response => {
				console.log(response.status);
				this.closeOverlay();
			})
			.catch(error => {
				console.log(error);
			});
	}

	closeOverlay() {
		this.props.togglePaintOverlay();
		this.props.getPaints();
	}

	render() {
		return (
			<Overlay
				width={300}
				height={400}
				isVisible={this.state.isVisible}
				onBackdropPress={() => {
					this.setState({ isVisible: false });
					this.props.togglePaintOverlay();
				}}
				windowBackgroundColor="rgba(255, 255, 255, .5)"
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center'
					}}
				>
					<View>
						<Text h3>{this.props.title}</Text>
						<Divider style={{ marginTop: 10, marginBottom: 10 }} />
						<Input
							label="Name"
							value={this.state.name}
							onChange={this.handleFieldChange.bind(this, 'name')}
						/>
						<Input
							label="Type"
							value={this.state.type}
							onChange={this.handleFieldChange.bind(this, 'type')}
						/>
						<Input
							label="Amount"
							value={this.state.amount.toString()}
							onChange={this.handleFieldChange.bind(this, 'amount')}
							keyboardType="numeric"
						/>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}
					>
						<Icon
							name={this.props.overlayIcon}
							color="#009900"
							size={50}
							onPress={() => {
								console.log('FOO');
								if (this.props.overlayIcon === 'refresh') {
									this.updatePaint();
								} else {
									this.addPaint();
								}
							}}
						/>
						{this.props.overlayIcon === 'refresh' ? (
							<Icon
								name="delete"
								color="#cc0000"
								size={50}
								onPress={() => {
									this.deletePaint();
								}}
							/>
						) : null}
					</View>
				</View>
			</Overlay>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		flex: 1
	}
});
