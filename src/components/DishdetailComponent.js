import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, BreadcrumbItem, Breadcrumb, 
        Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Staagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
    
class CommentForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" id="rating" name="rating"
                                        placeholder="Rating"
                                        className="form-control"                                        
                                        >
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10}}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}


function RenderDish({dish}){
    if(dish != null){
        return(
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle><b>{dish.name}</b></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }
    else{
        return(
            <div></div>
        );
    }
}

function RenderComments({dishComments, postComment, dishId}){
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
        
        return(<div>
                {comments}
                <CommentForm dishId={dishId} postComment={postComment}/>
                </div>);
    } 
}



const DishDetail = (props) => { 
    if (props.isLoading){
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if(props.dish == null){
        return(
            <div className="row">
            </div>
        )
    }
    else{
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish}/>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <RenderComments dishComments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default DishDetail;