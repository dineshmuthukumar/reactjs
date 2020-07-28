import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangephone = this.onChangephone.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onChangepassword = this.onChangepassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      phone:'',
      image_preview: '',
      image_file:'',
      selectedFile:'',
      password:'',
      fields: {},
      errors: {}
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
    onChangepassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onFileChange(event) { 
     
     let image_as_base64 = URL.createObjectURL(event.target.files[0])
      let image_as_files = event.target.files[0];


      this.setState({
            image_preview: image_as_base64,
            image_file: image_as_files,
        })
       //console.log(event.target.files[0]);
      // Update the state 
      this.setState({ selectedFile: event.target.files }); 
      console.log(event.target.files[0]);
     
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!fields["name"]){
           formIsValid = false;
           errors["name"] = " Name Cannot be empty";
        }

        if(typeof fields["name"] !== "undefined"){
           if(!fields["name"].match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors["name"] = "Only letters";
           }        
        }

        //Email
        if(!fields["email"]){
           formIsValid = false;
           errors["email"] = "Email Cannot be empty";
        }

        if(typeof fields["email"] !== "undefined"){
           let lastAtPos = fields["email"].lastIndexOf('@');
           let lastDotPos = fields["email"].lastIndexOf('.');

           if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
              formIsValid = false;
              errors["email"] = "Email is not valid";
            }
       } 
       if(!fields["phone"]){
           formIsValid = false;
           errors["phone"] = "phone Cannot be empty";
        } 

        if(typeof fields["phone"] !== "undefined"){
           if(!fields["name"].match(/^(\+91-|\+91|0)?\d{10}$/)){
              formIsValid = false;
              errors["phone"] = "Please enter a valid phone number with country code";
           }        
        }
         if(!fields["password"]){
           formIsValid = false;
           errors["password"] = "Password Cannot be empty";
        } 

        if(typeof fields["password"] !== "undefined"){
           if(!fields["name"].match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)){
              formIsValid = false;
              errors["password"] = "Please enter a valid password with min 8 character";
           }        
        }

       // var reg = '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/';
       this.setState({errors: errors});
       return formIsValid;
   }


 handleChange(field, e){         
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }

  onSubmit(e) {
     e.preventDefault();

    if(this.handleValidation()){
           
      let formData = new FormData();
      formData.append('profile_picture', this.state.selectedFile[0]);
      formData.append('name',this.state.fields['name']);
      formData.append('email',this.state.fields['email']);
      formData.append('phone',this.state.fields['phone']);
      formData.append('password',this.state.fields['password']);
      console.log(formData);
            axios({
                method: 'post',
                url: global.apiurl+'api/user',
                data: formData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
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

        }else{
           alert("Form has errors.")
        }

  
      
    
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
            <form onSubmit={this.onSubmit} enctype="multipart/form-data" >
                <div className="form-group">
                    <label>Name:  </label>
                    <input 
                      type="text" 
                      className="form-control" 
                       onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]} />
                      <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                </div>
                 <div className="form-group">
                  <label> Profile Picture:  </label>
                   <input type="file" onChange={this.onFileChange} /> 

                    <img src={this.state.image_preview} alt="image_preview" width='200px' height="200px"/>
                   
                 </div>
                <div className="form-group">
                    <label> email: </label>
                    <input type="text" 
                      className="form-control"
                      onChange={this.handleChange.bind(this, "email")} value={this.state.fields["eamil"]}
                      />
                      <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                </div>
                <div className="form-group">
                    <label>phone: </label>
                    <input type="text" 
                      className="form-control"
                      onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}
                      />
                      <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                </div>
                <div className="form-group">
                    <label>password: </label>
                    <input type="password" 
                      className="form-control"
                       onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}
                      />
                      <span style={{color: "red"}}>{this.state.errors["password"]}</span>
                </div>

                <div className="form-group">
                    <input type="submit" value="Register Business" className="btn btn-primary"/>
                </div>
            </form>
        </div>
    )
  }
}