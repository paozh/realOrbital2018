import React from 'react';
import { Map, TileLayer, Tooltip, Marker, LayersControl, AtttributionControl} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import BusLayer from './Layers/BusLayer';
import BTOLayer from './Layers/BTOLayer';
import SchoolLayer from './Layers/SchoolLayer';
import HawkerLayer from './Layers/HawkerLayer';

var CARTO_BASEMAP = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png';

var client = new carto.Client({
	apiKey: 'cefaa4464d8aba5e9a3afff2d22cea54e15990c2',
	username: 'wesleynsc'
});
var busStyle = `
	#layer {
		marker-width: 9;
		marker-fill: #EE4D5A;
		marker-line-color: #FFFFFF;
	}
`;

var BTOStyle = `
	#layer {
		polygon-fill: rgba(128, 128, 128, 1);
		polygon-opacity: 0.2;
	}
`;

var schoolStyle = `
	#layer {
		marker-width: 9;
		marker-fill: #AEDF11;
		marker-line-color: #FFFFFF;
	}
`;

var hawkerStyle = `
	#layer {
		marker-width: 9;
		marker-fill: #114D5A;
		marker-line-color: #FFFFFF;
	}
`;


// Initial boundaries set for panning, [LEFT CORNER, RIGHT CORNER] (longitude, latitude) OR (y,x)
var bounds = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 

class MapExample extends React.Component {

    state = {
	    center: [1.355075, 103.60494],
		zoom: 12,
		maxBounds: bounds,
		maxZoom: 18,
		minZoom: 12,
		mapRef: null,
		markerPosition: [1.316245, 103.805636],
		markerContent: "hellohello",
	}    

	componentDidMount() {
		// Make a reference to Leaflet Map object, which is in <Map ref="map"/> below
		this.state.mapRef = this.refs.map.leafletElement; 
	}

	handleReset = () => {
		console.log("flying");
		this.state.mapRef.flyToBounds(bounds);
	}

	handlePan = (btoBounds) => {
		console.log("panning");
		this.state.mapRef.flyToBounds(btoBounds);
		console.log("panning done");
	}

	handleMarker = (position, content) => {
		console.log("moving Marker/Popup");
		// change the position of the marker, and the content within the popup
		this.setState( {
			markerPosition: position,
			markerContent: content
		});
	}

	render(){
		if (this.props.shouldReset) {
			console.log("shouldReset");
			this.handleReset();
			this.props.resetClosure();
		}

		const { center, zoom, maxBounds, maxZoom, minZoom } = this.state;

		return (
		<div>
			{/* Must have id="mapid" */}
			<Map ref="map" id="mapid"
				center = {center}
				zoom = {zoom}
				animate={true}
				maxBounds={maxBounds}
				maxZoom={maxZoom}
				minZoom={minZoom}
				>
				<TileLayer 
					attribution = "Input value in TileLayer: Attribution"
					url = {CARTO_BASEMAP} 
					/>
				<Marker position = {this.state.markerPosition} draggable={true} id="marker">
        			<Tooltip>
						  <h5> {this.state.markerContent}</h5>
        				</Tooltip>
      				</Marker> 
				{/* <BusLayer style={busStyle} 
							  client={client} 
							  hidden={false}/> */}
				<BTOLayer onClick={this.handlePan} 
						  style={BTOStyle} 
						  client={client} 
						  hidden={false}/>
				{/* <SchoolLayer style={schoolStyle} 
							 hidden={false} 
							 client={client}/>
				<HawkerLayer mapRef={this.state.mapRef} 
							 style={hawkerStyle} 
							 hidden={false} 
							 client={client} 
							 handleMarker={this.handleMarker}
							 />
				<ShoppingLayer 
							style={shoppingStyle} 
							hidden={false} 
							client={client}/> */}
			</Map>
			<div id="legend">
				<b> Legend </b>
				<span class="btos">
					
					</span>
				BTO
				<span class="schools"> </span>
				Schools
				<span class="hawkers"> </span>
				Hawker Centers
				<span class="busstops"> </span>
				Bus Stops
				<span class="shopping"> </span>
				Shopping Centers
			</div>	
		</div>
		);
	}
}

export default MapExample;