import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js'; 

class BTOLayer extends Component {
  state = {
    hidden: null
  }

  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    source: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const { hidden, style } = props;
    const SQLquery = 'SELECT * FROM current_bto';

    const cartoSource = new carto.source.SQL(SQLquery);
    const cartoStyle = new carto.style.CartoCSS(style);

    // need to input the bounds in the BTO layer dataset
    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureClickColumns: ['name', 'top_right_lat', 'top_right_long',
           'bottom_left_lat', 'bottom_left_long', 'latitude', 'longitude']
    });
    this.setVisibility(hidden);
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    this.layer.on('featureOver', this.openTooltip);
    this.layer.on('featureClicked', featureEvent => {
      const southWest = [featureEvent.data.bottom_left_lat, featureEvent.data.bottom_left_long];
      const northEast = [featureEvent.data.top_right_lat, featureEvent.data.top_right_long];
      // [lat,long], increase lat goes up; increase long, goes right
      this.props.onClick([southWest, northEast]);

    });
  }

  openTooltip = (featureEvent) => {
    this.props.handleMarker([featureEvent.data.latitude,
        featureEvent.data.longitude],
        featureEvent.data.name);
  }

  // Optimisation of updates, not required for functionality
  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  // Hides the layer when called in render()
  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  render() {
    const { hidden, style } = this.props;
    const layerStyle = this.layer.getStyle();

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));

    return null;
  }
}

export default BTOLayer;