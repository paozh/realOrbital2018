import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Card.css';
import carto from '@carto/carto.js';

export default class Carda extends React.Component {
    constructor(props) {
        super(props);
        const {client, mapRef} = this.props;
        this.busDataSet = new carto.source.Dataset('busstop_most_updated_1');
        this.busDataview = new carto.dataview.Category(this.busDataSet, 'name', {
                limit: 2,
                operation: carto.operation.MIN,
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
                <h3> ${category.name} </h3>
                </li>
            `).join('');
            this.setState({
                content: <ul> ${categories} </ul>
            });
        });
        client.addDataview(this.busDataview);
        const bboxFilter = new carto.filter.BoundingBoxLeaflet(mapRef);
        this.busDataview.addFilter(bboxFilter);
    }


    render() {
         return (
            <div className="card1">
            <Card>
                <CardBody>
                <CardTitle>{this.props.cardTitle}</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>\
                <CardText> {this.props.cardText} </CardText>
                <CardText> {this.state.content} </CardText>
                <Button>Button</Button>
                </CardBody>
            </Card>
            </div>
        ); 
    }
} 

