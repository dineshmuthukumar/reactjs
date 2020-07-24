import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Index extends Component {



  constructor(props) {
      super(props);
      this.state = {business: []};
    }
    componentDidMount(){
      axios.get('http://localhost/Laravel/Users/api/user/list')
        .then(response => {
          this.setState({ business: response.data.data});
       // console.log(response.data.data);

       //  console.log(typeof(response.data.data)); 
          
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  
    render() {
   
 
 
    	
      return (
        <div>
          <h3 align="center">User List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Profile_Picture</th>
                <th>Email</th>
                <th>Phone</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
           
        		  
            
                  { this.state.business.map((value,index)=>
                <tbody key={index}>
                  <tr>
                    <td>{value.name}</td>
                     <td><img src = {global.imageurl+value.profile_picture} /></td>
                      <td>{value.email}</td>
                      <td>{value.phone}</td>
                      <td>
                        <Link to={"/edit/"+value.id} className="btn btn-primary">Edit</Link> 
                        <Link to={"/delete/"+value.id} className="btn btn-primary">Delete</Link>
                      </td>
                      </tr>
                </tbody>
                ) }

	        	
           

          </table>
        </div>
      );
    }
  }