import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class SchoolLayer extends Component {
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    style: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    // Change the source, to a customised one
    const { hidden, style } = props;
    const SQLsource = `SELECT * FROM school_data_most_updated`;

    const cartoSource = new carto.source.SQL(SQLsource);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
      featureOverColumns: ['school_name', 'longitude', 'latitude']
    });
    this.setVisibility(hidden)
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    this.layer.on('featureOver', this.openTooltip);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  //Function that adds the Tooltip functionality
  openTooltip = (featureEvent) => {
    this.props.handleMarker([featureEvent.data.latitude,
        featureEvent.data.longitude],
        featureEvent.data.school_name);
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

export default SchoolLayer;