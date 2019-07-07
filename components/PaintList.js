import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import axios from 'axios';
import config from '../config';
import editPaint from './EditPaint';
import EditPaint from './EditPaint';

export default class PaintList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paints: [],
			editOverlayOpen: false,
			editablePaint: {}
		};

		this.getPaints = this.getPaints.bind(this);
		this.toggleEditOverlay = this.toggleEditOverlay.bind(this);
	}
	componentWillMount() {
		this.getPaints();
	}

	toggleEditOverlay() {
		this.setState({ editOverlayOpen: !this.state.editOverlayOpen });
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
							onPress: () => {
								this.setState({ editablePaint: v });
								this.toggleEditOverlay();
							}
						}}
					/>
				))}
				{this.state.editOverlayOpen ? (
					<EditPaint
						paint={this.state.editablePaint}
						toggleEditOverlay={this.toggleEditOverlay}
						isVisible={this.state.editOverlayOpen}
					/>
				) : null}
			</View>
		);
	}
}
