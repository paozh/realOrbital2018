import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Progress } from 'reactstrap';
import './Card.css';
import carto from '@carto/carto.js';

const DISTANCE_PUNGGOL = 'distance_to_punggol';
const DISTANCE_YW = 'distance_to_yishun_west';
const DISTANCE_YE = 'distance_to_yishun_east';


export default class Carda extends React.Component {
    constructor(props) {
        super(props);        
        this.busSource = new carto.source.SQL('SELECT * FROM busstop_most_updated_1_copy');
        this.busDataview = new carto.dataview.Category(this.busSource, 'name', {
                limit: 3,
                operation: carto.operation.MIN,
                operationColumn: "NULL"
            }
        );

        this.hawkerDataSet = new carto.source.SQL('SELECT * FROM hawker_centres_copy');
        this.hawkerDataview = new carto.dataview.Category(this.hawkerDataSet, 'name', {
                limit: 3,
                operation: carto.operation.MIN,
                operationColumn: "NULL"
            }
        )

        this.schoolDataSet = new carto.source.Dataset('school_data_most_updated_copy');
        this.schoolDataview = new carto.dataview.Category(this.schoolDataSet, 'school_name', {
                limit: 3,
                operation: carto.operation.MIN,
                operationColumn: "NULL"
            }
        )
    }


    componentDidMount() {
        const { client, mapRef } = this.props;

        if (mapRef != null) {
            var busInner, hawkerInner, schoolInner;

            const busHeading = "Nearest Bus Stops: ";
            const schoolHeading = "Nearest Schools: ";
            const hawkerHeading = "Nearest Hawker Centers: ";
            
            this.busDataview.on('dataChanged', (data) => {

                busInner = data.categories.map(category => 
                    `<li>
                        ${category.name} : ${category.value.toFixed(2) + " meters"}
                    </li>`
                ).join('');

                document.querySelector('.cardtext').innerHTML = `<ul> 
                                                                    <h5> ${busHeading} </h5> \n 
                                                                    ${busInner} \n
                                                                    <h5> ${hawkerHeading} </h5> \n 
                                                                    ${hawkerInner}\n 
                                                                    <h5> ${schoolHeading} </h5> \n
                                                                    ${schoolInner}
                                                                    </ul>`;
            });

            this.hawkerDataview.on('dataChanged', (data) => {
                hawkerInner = data.categories.map(category => 
                    `<li>
                        ${category.name} : ${category.value.toFixed(2) + " meters"}
                    </li>`
                ).join('');
                document.querySelector('.cardtext').innerHTML = `<ul> 
                                                                    <h5> ${busHeading} </h5> \n 
                                                                    ${busInner} \n
                                                                    <h5> ${hawkerHeading} </h5> \n 
                                                                    ${hawkerInner}\n 
                                                                    <h5> ${schoolHeading} </h5> \n
                                                                    ${schoolInner}
                                                                    </ul>`;
            });
            
            this.schoolDataview.on('dataChanged', (data) => {
                schoolInner = data.categories.map(category => 
                    `<li>
                        ${category.name} : ${category.value.toFixed(2) + " meters"}
                    </li>`
                ).join('');
                document.querySelector('.cardtext').innerHTML = `<ul> 
                                                                    <h5> ${busHeading} </h5> \n 
                                                                    ${busInner} \n
                                                                    <h5> ${hawkerHeading} </h5> \n 
                                                                    ${hawkerInner}\n 
                                                                    <h5> ${schoolHeading} </h5> \n
                                                                    ${schoolInner}
                                                                    </ul>`;
            });


            const bboxFilter = new carto.filter.BoundingBoxLeaflet(mapRef);

            client.addDataview(this.schoolDataview);
            client.addDataview(this.hawkerDataview);
            client.addDataview(this.busDataview);

            this.schoolDataview.addFilter(bboxFilter);
            this.hawkerDataview.addFilter(bboxFilter);
            this.busDataview.addFilter(bboxFilter);
        } 
    }

    shouldComponentUpdate() {
        //console.log("in card shouldComponentUpdate: this.props.mapRef: " + this.props.mapRef );
        return true;
    }

    componentDidUpdate() {
        switch(this.props.featureOnFocus) {
            case "Yishun East": {
                console.log("in card -> switch -> dist to YE");
                this.busDataview.setOperationColumn(DISTANCE_YE);
                this.hawkerDataview.setOperationColumn(DISTANCE_YE);
                this.schoolDataview.setOperationColumn(DISTANCE_YE);
                break;
            }

            case "Yishun West": {
                console.log("in card -> switch -> dist to  YW");
                this.busDataview.setOperationColumn(DISTANCE_YW);
                this.hawkerDataview.setOperationColumn(DISTANCE_YW);
                this.schoolDataview.setOperationColumn(DISTANCE_YW);
                break;
            }

            case "Punggol": {
                console.log("in card -> switch -> dist to punggol");
                this.busDataview.setOperationColumn(DISTANCE_PUNGGOL);
                this.hawkerDataview.setOperationColumn(DISTANCE_PUNGGOL);
                this.schoolDataview.setOperationColumn(DISTANCE_PUNGGOL);
                break;
            }

            default: 
                document.querySelector('.cardtext').innerHTML = `<h5> Select a BTO Sector! </h5>`;
                console.log("featureOnFocus is null");
        }

        console.log("new featureOnFocus will be: " + this.props.featureOnFocus);
    }


    render() {
         return (
            <div className="card1">
            <Card>
                <CardBody>
                {/* <CardTitle>{this.props.cardTitle}</CardTitle> */}
                {/* <CardSubtitle> Insert Card subtitle</CardSubtitle>
                <CardText>  Insert Some quick example text to build on the card title and make up the bulk of the card's content </CardText>
                <CardText> {this.props.cardText} </CardText> */}
                <CardText className="cardtext"> 
                    <Progress animated value="100"/>
                    </CardText>
                </CardBody>
            </Card>
            </div>
        ); 
    }
} 

