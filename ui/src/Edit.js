import React from "react";
import "./edit.css"
import Nav from "./Nav.js"
import swal from 'sweetalert'

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validMobileRegex = RegExp(/^[6-9]{1}[0-9]{9}$/);

var n=sessionStorage.getItem("uname")
var e=sessionStorage.getItem("uemail")
var ph=sessionStorage.getItem("uphone")
console.log("Name",n);
export class Edit extends React.Component {

  constructor(props) {
    super(props);
      
    this.state={

      n:false,        
      e:false,
      ph:false,
      email:e,
      phoneNumber:ph,
      name : n,
      cpswd : '',
      errors: {
        name: '',
        email: '',
        mobile : '',
      }

    }
    this.handleEmailChange=this.handleEmailChange.bind(this)
    this.handlePhoneNumberChange=this.handlePhoneNumberChange.bind(this)
    this.handleUpdate=this.handleUpdate.bind(this)
    this.handleCancel=this.handleCancel.bind(this)
    this.state.name=sessionStorage.getItem("name")
  }

  componentDidMount(){
    this.setState({
       name : sessionStorage.getItem("uname"),
       email:sessionStorage.getItem("uemail"),
       phoneNumber:sessionStorage.getItem("uphone"),
     })
     
   }
   /*handleNameChange = event => {
    this.setState({
        n:true,
        name : event.target.value
      });
  }*/
  
  handleEmailChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.email = 
          validEmailRegex.test(event.target.value)
            ? ''
            : 'Email is not valid!';
    console.log(errors.email)
    if(errors.email ==  '')
      {
        this.setState({e : true});
     }       
     this.setState({errors, [name]: value});
    
  }
  handlePhoneNumberChange=event=>{
    const { name, value } = event.target;
    let errors = this.state.errors;
    errors.mobile = 
    (validMobileRegex.test(event.target.value))
      ? ''
      : 'Enter a valid phone number!';
   if(errors.mobile==  '')
    {
      this.setState({ph : true});
    }
    this.setState({errors, [name]: value});
    
  }
  
  

  handleCancel(){
    //window.location.href="/home";
    window.history.back();
  }
  handleUpdate(event) {
    
        event.preventDefault();
        console.log(this.state)
        var body = {
        name : sessionStorage.getItem("name"),
        phoneNumber: this.state.phoneNumber,
        email : this.state.email,
        }
        console.log(body);
        
  

            const url = "http://localhost:9000/edit";
            let headers = new Headers();
        
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
        
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
        
            headers.append('POST','GET');
        
            fetch(url, {
            headers:headers,
            method: 'POST',
            body: JSON.stringify(body)
            })
            .then(response => response.json())
            .then(contents => {console.log(contents);
                            
        })
        .catch(()=> console.log("can't access " + url + " response. "))


        //alert('Details are updated successful');
        swal("Good job!",'Details are updated successfully',"success");
            this.props.history.push("./profile");
        

    }

  
  
  
  render() {
    const {errors} = this.state;
    return (
      <div><Nav/>
		<div className="edit">
      
				<form onSubmit={this.displayLogin}>
					<h2>Edit User Details</h2>

					<div className="name">
						Name:{sessionStorage.getItem("name")}
					</div>
                    <div className="email">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange} required
                                    />
                                    <span className='error'>{errors.email}</span>
                                </div>
                    <div className="phoneNumber">
                                    <input
                                        type="text"
                                        placeholder="Phone Number"
                                        name="phoneNumber"
                                        value={this.state.phoneNumber}
                                        onChange={this.handlePhoneNumberChange} required
                                    />
                                    <span className='error'>{errors.mobile}</span>
					</div>
                 
			
					<input type="submit" value="Update" onClick={this.handleUpdate}/>
          <input type="submit" value="Cancel" onClick={this.handleCancel}/>
				</form>
			</div>
      </div>
      
    );
  }
}


export default Edit;