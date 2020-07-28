import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Index extends Component {



  constructor(props) {

  
      super(props);
      this.state = {
        business: []
      };

      this.delete = this.delete.bind(this);
    }
    componentDidMount(){
      axios.get(global.apiurl+'api/user')
        .then(response => {
          this.setState({ business: response.data.data});
       // console.log(response.data.data);

       //  console.log(typeof(response.data.data)); 
          
        })
        .catch(function (error) {
          console.log(error);
        })
    }
delete(value) {

        let formData = new FormData();
      //formData.append('profile_picture', this.state.selectedFile[0]);
        formData.append('id',value);

        formData.append('_method','Delete');
        //console.log(this.value);

        axios({
                method: 'post',
                url: global.apiurl+'api/user',
                data: formData
                })  
            .then(res => {
                if(res.data.response === "true"){
                //     const chatid = res.data.chatid;
                // ////console.log("chatid",chatid);
                this.props.history.push('/index');
                //     pathname: "/Message/ViewMessage",
                //     state: { userid: this.state.user_id,chatid:chatid,sourceid : 'undefined'}
                // });
                }
                else{
                  alert(res.data.msg);
                //    message.info(res.data.message)
                }
            })
             .catch((error) => {


                alert(error.response.data.msg);
                // let title = error.response.data.status;
                // let body = error.response.data.msg;
                // //this.displayNotificationError(title,body);
                // alert(title);
                // alert(body);
            });

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
                     <td><img src = {global.imageurl+value.profile_picture}  width="200px" height="200px"/></td>
                      <td>{value.email}</td>
                      <td>{value.phone}</td>
                      <td>
                        <Link to={"/edit/"+value.id} className="btn btn-primary">Edit</Link> 
                        
                      </td>
                       <td>
                 <button  onClick={()=>this.delete(value.id)} value={value.id}   className="btn btn-danger">Delete</button>
          </td>
                      </tr>
                </tbody>
                ) }

	        	
           

          </table>
        </div>
      );
    }
  }