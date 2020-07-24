import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      phone:'',
      selectedFile:''
    }
   
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
  onFileChange(event) { 
     
       //console.log(event.target.files[0]);
      // Update the state 
      this.setState({ selectedFile: event.target.files }); 
      console.log(event.target.files[0]);
     
    }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      myFile:this.state.selectedFile, 
      myFileName:this.state.selectedFile.name,
    };


    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
     axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://localhost/Laravel/Users/api/user/add', obj).then((response) => {
    // handle success response (HTTP CODE 200)

          if (response.success) {
              //handle success
          } else {
              //handle error
          }
      })
      .catch((error) => {
      // handle error response (HTTP CODE 400)
      });
      
    
    this.setState({
      name: '',
      selectedFile:'',
      email: '',
      phone: '',

    })
  }
 
  render() {
    return (
        <div style={{ marginTop: 10 }}>
            <h3>Add New Business</h3>
            <form onSubmit={this.onSubmit}>
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
                  <label> Profile Picture:  </label>
                   <input type="file" onChange={this.onFileChange} /> 
                 </div>
                <div className="form-group">
                    <label> email: </label>
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
                    <input type="submit" value="Register Business" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}