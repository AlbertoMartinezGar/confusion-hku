import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle } from 'reactstrap';

class DishDetail extends Component{

    constructor(props){
        super(props);
    }

    renderComments(dishComments){
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


    render(){
        //console.log(this.props.dish);
        if(this.props.dish == null){
            return(
                <div className="row">
                </div>
            )
        }
        else{
            const actualDish = this.props.dish;
            const comments = this.renderComments(actualDish.comments);
            return(
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>                    
                                <CardImg width="100%" src={actualDish.image}/>
                                <CardTitle><b>{actualDish.name}</b></CardTitle>
                                <CardText>{actualDish.description}</CardText>
                            </Card>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <h4>Comments</h4>
                            {comments}
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default DishDetail