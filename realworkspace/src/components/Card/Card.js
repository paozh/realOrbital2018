import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Card.css';
import carto from '@carto/carto.js';

export default class Carda extends React.Component {
    constructor(props) {
        super(props);
        this.busSource = new carto.source.SQL('SELECT * FROM busstop_most_updated_1');
        this.busDataview = new carto.dataview.Category(this.busSource, 'name', {
                limit: 3,
                operation: carto.operation.MAX,
                operationColumn: 'distance_to_yishun_east'
            }
        );

        // this.hawkerDataSet = new carto.source.Dataset('hawker_centres');
        // this.hawkerDataview = new carto.dataview.Category(this.hawkerDataSet, 'name', {
        //         limit: 2,
        //         operation: carto.operation.SUM,
        //         operationColumn: 'distance_to_yishun_east'
        //     }
        // )
        // this.schoolDataSet = new carto.source.Dataset('busstop_most_updated_1');
        // this.schoolDataview = new carto.dataview.Category(this.schoolDataSet, 'distance_to_yishun_east', {
        //         limit: 2,
        //         operation: carto.operation.SUM,
        //         operationColumn: 'distance_to_yishun_east'
        //     }
        // )
    }

    state = {
        content: <h1> "hello" </h1>
    }


    componentDidMount() {

        const { client, mapRef } = this.props;
        this.busDataview.on('dataChanged', (data) => {

            const categories = data.categories.map(category => `
                <li>
                    "this is" + ${category.name} + "next is: " + ${category.value}
                </li>
            `).join('');

            document.querySelector('.cardtext').innerHTML = `<ul> ${categories} </ul>`;
        });
        client.addDataview(this.busDataview);
        const bboxFilter = new carto.filter.BoundingBoxLeaflet(mapRef);
        this.busDataview.addFilter(bboxFilter);
    }

    componentDidUpdate() {
        console.log("new featureOnFocus is: " + this.props.featureOnFocus);
        
        // // change sqlquery of dataset
        // switch(this.props.featureOnFocus) {
        //     case "Yishun East": {
        //         this.busSource.setQuery('');
        //         console.log("featureOnFocus is yishun east");
        //         break;
        //     }

        //     case "Yishun West": {
        //         this.busSource.setQuery('');
        //         console.log("featureOnFocus is yishun west");
        //         break;
        //     }

        //     case "Punggol": {
        //         this.busSource.setQuery('');
        //         console.log("featureOnFocus is punggol");
        //         break;
        //     }

        //     default:
        //         console.log("invalid featureOnFocus");
        // }
    }


    render() {
         return (
            <div className="card1">
            <Card>
                <CardBody>
                <CardTitle>{this.props.cardTitle}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <CardText> {this.props.cardText} </CardText>
                <CardText className="cardtext">  </CardText>
                </CardBody>
            </Card>
            </div>
        ); 
    }
} 

