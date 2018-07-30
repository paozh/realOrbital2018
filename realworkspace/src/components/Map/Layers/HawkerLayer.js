import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';

class HawkerLayer extends Component {

  state = {
    position: [1.2462530584216953,103.17157000878907]
  }

  /* 
   * Some type-checking, using PropTypes modules 
   */
  static contextTypes = {
    map: PropTypes.object,
  };

  static propTypes = {
    handleMarker: PropTypes.func,
    style: PropTypes.string,
    client: PropTypes.object,
    hidden: PropTypes.bool
  }

  constructor(props) {
    super(props);

    // Changed the source, to a customised one
    // Necessary lines to initialise a Carto.Layer object, using the client
    const { hidden, style } = props;
    const SQLsource = `SELECT * FROM hawker_centres`; 

    const cartoSource = new carto.source.SQL(SQLsource);
    const cartoStyle = new carto.style.CartoCSS(style);

    this.layer = new carto.layer.Layer(cartoSource, cartoStyle, {
        featureOverColumns: ['name', 'latitude', 'longitude']
    });
    this.setVisibility(hidden)
  }

  /*
   * Takes in the featureEvent, whose properities are defined by featureOverColumns
   * Uses the handlerMarker that was passed as a props from Map.js 
   */
  openTooltip = (featureEvent) => {
    this.props.handleMarker([parseFloat(featureEvent.data.latitude),
        parseFloat(featureEvent.data.longitude)],
        featureEvent.data.name);
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    // Add carto hoverOver & hoverOut functions as second argument
    this.layer.on('featureOver', this.openTooltip);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

  // Sets the visibility of the layers 
  setVisibility = isHidden => {
    isHidden ? this.layer.hide() : this.layer.show();
  }

  render() {
    const { hidden, style } = this.props;
    const layerStyle = this.layer.getStyle();

    if (hidden) {
      console.log("in hawker layer");
      this.layer.hide();
    } else {
      this.layer.show();
    }

    layerStyle.setContent(style).then(() => this.setVisibility(hidden));
    return null;
  }
}

export default HawkerLayer;