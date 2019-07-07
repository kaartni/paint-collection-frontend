import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import config from '../config';
import Paint from './Paint';

export default class PaintList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			paints: [],
			overlayOpen: false,
			overlayTitle: null,
			overlayIcon: null,
			editablePaint: {}
		};

		this.getPaints = this.getPaints.bind(this);
		this.togglePaintOverlay = this.togglePaintOverlay.bind(this);
	}
	componentWillMount() {
		this.getPaints();
	}

	togglePaintOverlay(iconStr) {
		this.setState({ overlayIcon: iconStr });
		this.setState({ overlayOpen: !this.state.overlayOpen });
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
			<View style={{ flex: 1 }}>
				<ScrollView style={{ flex: 1.8 }}>
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
									this.setState({ overlayTitle: 'Edit paint' });
									this.togglePaintOverlay('refresh');
								}
							}}
							topDivider={true}
							bottomDivider={true}
						/>
					))}
					{this.state.overlayOpen ? (
						<Paint
							paint={this.state.editablePaint}
							togglePaintOverlay={this.togglePaintOverlay}
							isVisible={this.state.overlayOpen}
							title={this.state.overlayTitle}
							getPaints={this.getPaints}
							overlayIcon={this.state.overlayIcon}
						/>
					) : null}
				</ScrollView>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignContent: 'center',
						backgroundColor: 'black'
					}}
				>
					<Icon
						name="add-circle"
						color="white"
						size={50}
						onPress={() => {
							let newPaint = {
								name: '',
								type: '',
								amount: 0
							};
							this.setState({ editablePaint: newPaint });
							this.setState({ overlayTitle: 'Add paint' });
							this.togglePaintOverlay('add-circle');
						}}
					/>
				</View>
			</View>
		);
	}
}
