import React, { Component } from 'react'
import { Container, Button, Form, Input, } from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'


export default class Login extends Component {
    constructor(){
        super()
        this.state={
            username:"",
            password:"",
            loginState:false,
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit=(e)=>{
        e.preventDefault()
        fetch(`https://swapi.co/api/people/?format=json&search=${this.state.username}`)
        .then(res=>res.json())
        .then(data=>{
            if((data.count===1) && (this.state.password===data.results[0].birth_year)){
                localStorage.clear()
                localStorage.setItem('username',data.results[0].name)
                this.setState({loginState:true})

            }else{
                alert("Invalid Credentials, Please check the details again")
            }
            
        })}      



    render() {
        if(this.state.loginState===true){
            return <Redirect to="/Search"></Redirect>
        }
        return (
        <div className="bg height1001">
                <Container className="height100 logincontainer">
                            <img height="380px" width="380px" alt="superhero"
                                src="https://media.comicbook.com/2019/10/star-wars-the-legends-of-skywalker-manga-viz-media-1190443-1280x0.jpeg"/>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Field control={Input} type="text"  placeholder='Username' value={this.state.username} name="username" onChange={this.onChange} required />
                                    <Form.Field control={Input} type="password" placeholder='Password' value={this.state.password} name="password" onChange={this.onChange} required />                                  
                                    <br/><Button fluid floated="center"color="red" type="submit">Submit</Button>
                                </Form>
                            
                </Container>
            </div>)
    }
}
