import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class BusLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    source: PropTypes.string,
    style: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    const { hidden, style } = props;
    const SQLquery = 'SELECT * FROM busstop_most_updated_1';
    const cartoSource = new carto.source.SQL(SQLquery);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureOverColumns: ['name', 'latitude', 'longitude']
    });
    this.setVisibility(hidden)
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    // Adds the Tooltip functionality
    this.layer.on('featureOver', this.openTooltip);
  }

  // Optimisation of updates, not required for functionality
  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  // Hides the layer when called in render()
  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  //Function that adds the Tooltip functionality
  openTooltip = (featureEvent) => {
    this.props.handleMarker([featureEvent.data.latitude,
        featureEvent.data.longitude],
        featureEvent.data.name);
  }

  render() {
    const { hidden, style } = this.props;

    if (hidden) {
      this.layer.hide();
    } else {
      this.layer.show();
    }

    const layerStyle = this.layer.getStyle();

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));

    return null;
  }
}

export default BusLayer;