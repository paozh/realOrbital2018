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
    const SQLquery = 'SELECT * FROM current_bto_sectors';

    const cartoSource = new carto.source.SQL(SQLquery);
    const cartoStyle = new carto.style.CartoCSS(style);

    // need to input the bounds in the BTO layer dataset
    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureClickColumns: ['name', 'latitude', 'longitude']
    });
    this.setVisibility(hidden);
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    this.layer.on('featureOver', this.openTooltip);
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