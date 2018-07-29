import { Component } from 'react';
import PropTypes from 'prop-types';
import carto from '@carto/carto.js';
import { Map, TileLayer} from 'react-leaflet';

var bounds = [[1.2462530584216953,103.17157000878907], [1.4573106102494986,104.02299579003907]]; 

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
      featureClickColumns: ['name', 'top_right_lat', 'top_right_long', 'bottom_left_lat', 'bottom_left_long']
    });
    this.setVisibility(hidden);
  }

  componentDidMount() {
    const { client } = this.props;
    client.addLayer(this.layer);
    client.getLeafletLayer().addTo(this.context.map);

    this.layer.on('featureClicked', featureEvent => {
      const southWest = [featureEvent.data.bottom_left_lat, featureEvent.data.bottom_left_long];
      const northEast = [featureEvent.data.top_right_lat, featureEvent.data.top_right_long];
      // [lat,long], increase lat goes up; increase long, goes right
      // To narrow scope,
      // left: 
      // right: 
      console.log([southWest, northEast]);
      this.props.onClick([[1.410729, 103.89060], [1.418378, 103.902596]]);
      console.log(`Mouse over city with name: ${featureEvent.data.name}`);
    });

  }

  shouldComponentUpdate(nextProps) {
    return nextProps.style !== this.props.style || nextProps.hidden !== this.props.hidden;
  }

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