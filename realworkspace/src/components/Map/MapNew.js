import React from 'react';
import { Map, TileLayer, Tooltip, Marker} from 'react-leaflet';
import './Map.css';
import carto from '@carto/carto.js';
import BusLayer from './Layers/BusLayer';
import SchoolLayer from './Layers/SchoolLayer';
import HawkerLayer from './Layers/HawkerLayer';
import BTOSectorLayer from './Layers/BTOSectorLayer';
import Card from '../Card/Card';

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
		polygon-fill: rgba(28, 128, 28, 1);
		polygon-opacity: 0.4;
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
var boundsYE = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 
var boundsYW = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 
var boundsPunggol = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 

class MainMap extends React.Component {

    state = {
	    center: [1.355075, 103.60494],
		zoom: 12,
		maxBounds: bounds,
		maxZoom: 18,
		minZoom: 12,
		mapRef: null,
		markerPosition: [1.316245, 103.805636],
		markerContent: "hellohello"
	}    

	componentDidMount() {
		// Make a reference to Leaflet Map object, which is in <Map ref="map"/> below
		this.setState({
			mapRef: this.refs.map.leafletElement
		})
		console.log("in map componentDidMount: this.state.mapRef: " + this.state.mapRef);
	}

	handlePan = (bounds) => {
		console.log("panning");
		console.log("in map handlePan: this.state.mapRef: " + this.state.mapRef);
		this.state.mapRef.flyToBounds(bounds);
	}

	handleMarker = (position, content) => {
		// change the position of the marker, and the content within the popup
		this.setState( {
			markerPosition: position,
			markerContent: content
		});
	}

	componentDidUpdate() {
		if(this.state.mapRef == null) {
			this.setState({
				mapRef: this.refs.map.leafletElement
			})
			console.log("in map componentDidUpdate: this.state.mapRef: " + this.state.mapRef);
		}
	}

	// not sure how props.shouldReset works
	shouldComponentUpdate() {
		var result = true;
		console.log("in map shouldComponentUpdate: this.state.mapRef: " + this.state.mapRef);
		if (this.props.shouldReset) {
			console.log("shouldReset problem");
            this.handlePan(bounds);
            this.props.resetClosure();
			return true;
		} else if (this.props.shouldMoveToYishunEast) {
			console.log("YE problem");
			this.handlePan(boundsYE);
            this.props.moveToYishunEastClosure();
            return true;
        } else if (this.props.shouldMoveToYishunWest) {
			console.log("YW problem");
			this.handlePan(boundsYW);
            this.props.moveToYishunWestClosure();
            return true;
        } else if (this.props.shouldMoveToPunggol) {
			console("punggol problem");
			this.handlePan(boundsPunggol);
            this.props.moveToPunggolClosure();
            return true;
        } else {
			console.log("else problem");
            return true;
        }
	}

	render(){
		const { center, zoom, maxBounds, maxZoom, minZoom } = this.state;

		return (
		<div>
			{/* Must have id="mapid" */}
			<Map ref="map"
                id="mapid"
				center = {center}
				zoom = {zoom}
				animate={true}
				maxBounds={maxBounds}
				maxZoom={maxZoom}
				minZoom={minZoom}
				>
                
				<Card cardText="blahblahblah" 
					  client={client}
					  mapRef={this.state.mapRef}
					  featureOnFocus={this.props.featureOnFocus}
					/>
				<TileLayer 
					url = {CARTO_BASEMAP} 
					/>
				<Marker position = {this.state.markerPosition} draggable={true} id="marker">
        			<Tooltip>
						  <h5> {this.state.markerContent}</h5>
        				</Tooltip>
      				</Marker> 
				<BusLayer style={busStyle} 
						  client={client} 
						  hidden={this.props.busStopHidden} 
						  handleMarker={this.handleMarker}
						  />
				{/* <BTOLayer onClick={this.handlePan} 
						  style={BTOStyle} 
						  client={client} 
						  hidden={this.state.hideBTO}
						  handleMarker={this.handleMarker}
						  /> */}
				<SchoolLayer style={schoolStyle} 
							 hidden={this.props.schoolHidden} 
							 client={client}
							 handleMarker={this.handleMarker}
							 />
				<HawkerLayer  
							 style={hawkerStyle} 
							 hidden={this.props.hawkerHidden} 
							 client={client} 
							 handleMarker={this.handleMarker}
							 />
				<BTOSectorLayer onClick={this.handlePan}
								style={BTOStyle}
								client={client}
								hidden={false}
								handleMarker={this.handleMarker}
								/>

			</Map>
			<div id="legend">
				<b> Legend </b>
				<span className="btos">	</span>
				BTO
				<span className="schools"> </span>
				Schools
				<span className="hawkers"> </span>
				Hawker Centers
				<span className="busstops"> </span>
				Bus Stops
			</div>	
		</div>
		);
	}
}

export default MainMap;