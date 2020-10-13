import React from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

    function RenderDish({dish}){
        if(dish != null){
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle><b>{dish.name}</b></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }
        else{
            return(
                <div></div>
            );
        }
    }

    function RenderComments({dishComments}){
        if(dishComments == null){
            return(
                <div></div>
            )
        }
        else{
            var comments = dishComments.map((comm) => {
                return(
                    <div key={comm.id}>
                        <ul className="list-unstyled">
                            <li>{comm.comment}</li>
                            <li>-- {comm.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comm.date)))}</li>
                        </ul>
                    </div>
                );
            });    
            return(comments);
        } 
    }


    const DishDetail = (props) => { 
        //console.log(this.props.dish);
        if(props.dish == null){
            return(
                <div className="row">
                </div>
            )
        }
        else{
            return(
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            <RenderComments dishComments={props.dish.comments}/>
                        </div>
                    </div>
                </div>
            )
        }
    }


export default DishDetail;