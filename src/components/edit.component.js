import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      phone:'',
      id:''

    }
  }

  componentDidMount() {
      axios.get(global.apiurl+'api/user/'+this.props.match.params.id)
          .then(response => {
              this.setState({ 
              	id:response.data.data.id, 
                name: response.data.data.name, 
                email: response.data.data.email,
                phone: response.data.data.phone 

              });
          })
          .catch(function (error) {
              console.log(error);
          })
    }

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeemail(e) {
    this.setState({
      email: e.target.value
    })  
  }
  onChangephone(e) {
    this.setState({
      phone: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();
  /*  const obj = {
     id:  this.state.id,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    };*/


       let formData = new FormData();
      //formData.append('profile_picture', this.state.selectedFile[0]);
        formData.append('id',this.state.id);
        formData.append('name',this.state.name);
        formData.append('email',this.state.email);
        formData.append('phone',this.state.phone);    
        formData.append('_method','put');

  
  
            axios({
                method: 'Post',
                url: global.apiurl+'api/user',
                data:formData
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
               
            });
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3 align="center">Update Business</h3>
            <form onSubmit={this.onSubmit}>
            <input type="hidden"  name="id" value={this.state.id}/>
                <div className="form-group">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={this.state.name}
                      onChange={this.onChangename}
                      />
                </div>

                <div className="form-group">
                    <label>email: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.email}
                      onChange={this.onChangeemail}
                      />
                </div>
                <div className="form-group">
                    <label>phone: </label>
                    <input type="text" 
                      className="form-control"
                      value={this.state.phone}
                      onChange={this.onChangephone}
                      />
                </div>
                <div className="form-group">
                    <input type="submit" 
                      value="Update Business" 
                      className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}