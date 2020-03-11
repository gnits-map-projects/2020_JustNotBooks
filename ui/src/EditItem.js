import React from "react";
import "./edit.css"
import Nav from "./Nav.js"



export class EditItem extends React.Component {

  constructor(props) {
    super(props);
      
    this.state={
      
      owner:'',
      itemName:'',
      image:'',
      price:'',
      description : '',
      category: '',
      from2 : null,
      to2 :null,

    }
   
    this.handlePriceChange=this.handlePriceChange.bind(this)
    this.handleDescriptionChange=this.handleDescriptionChange.bind(this)
    this.handleAddressChange=this.handleAddressChange.bind(this)
	  this.handleCategoryChange=this.handleCategoryChange.bind(this)
    this.handleFromChange=this.handleFromChange.bind(this)
    this.handleToChange=this.handleToChange.bind(this)
    this.handleUpdate=this.handleUpdate.bind(this)
    //this.DateEnabale=this.DateEnabale.bind(this)
    this.state.owner = sessionStorage.getItem("name");
    
  }
  
  DateEnable(event){
    if (document.getElementById("borrow").checked) {
      document.getElementById("from2").style.visibility = 'visible';
      document.getElementById("to2").style.visibility = 'visible';
  }
  else {
    document.getElementById('from2').style.visibility = 'hidden';
    document.getElementById('to2').style.visibility = 'hidden';
  }
  
  }
  handlePriceChange=event=>{
    this.setState({
      price : event.target.value
    });
    
  }
  handleDescriptionChange=event=>{
    this.setState({
      description : event.target.value
    });
    
  }
  handleAddressChange=event=>{
    this.setState({
      address : event.target.value
    });
    
  }

  handleCategoryChange=event=>{
    this.setState({
      category : event.target.value
    });
    
  }
  handleFromChange=event=>{
    this.setState({
      from2 : event.target.value
    });
    
  }
  handleToChange=event=>{
    this.setState({
      to2 : event.target.value
    });
    
  }

   
  handleUpdate(event) {
    
        event.preventDefault();
        console.log(this.state)
        var body = {
          id:this.props.match.params.id,
          price:this.state.price,
          category:this.state.category,
          address:this.state.address,
          description:this.state.description,
          from2:this.state.from2,
          to2:this.state.to2
        }
        console.log(body);
        
  

            const url = "http://localhost:9000/editItem";
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


        alert('Details are Edited successfully');
            //this.fun.bind(this);*/
            //window.location.reload(false);
            //window.location.href="./profile";
            this.props.history.push("/seller");
        

    }

    componentDidMount(){
      var id=this.props.match.params.id;
      console.log(id)

     
      const url = "http://localhost:9000/itemDetails";
      
          let headers = new Headers();
      
            headers.append('Content-Type','application/json');
            headers.append('Accept','application/json');
      
            headers.append('Access-Control-Allow-origin',url);
            headers.append('Access-Control-Allow-Credentials','true');
    
            headers.append('POST','GET');
            var body={
                id:id
            };
            console.log(body)

           var s = fetch(url, {
              headers:headers,
              method: 'POST',
              body: JSON.stringify(body)
            }).then(response => 
              response.json().then(data => ({
                  data1: (data)
              })
          ).then(res => {
            this.setState({
               itemName:res.data1.itemName,
               price:res.data1.price,
               category:res.data1.category,
               address:res.data1.address,
               description:res.data1.description,
               from2:res.data1.from2,
               to2:res.data1.to2
              });
                     
                      
        })); 
       
    }
  
  
  render() {
    let today = new Date().toISOString().substr(0, 10);
    return (
      <div><Nav/>
		<div className="edit">
      
				<form onSubmit={this.displayLogin}>
					<h2>Edit Item Details</h2>

					<div className="itemName">
						Item Name:{this.state.itemName}
					</div>
                    <div className="price">
                                    <input
                                        type="text"
                                        placeholder="price"
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.handlePriceChange} required
                                    />
                            
                                </div>
                      <div className="category">
                                <label>
                                    <input type="radio" id="buy" name="category" value="buy" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/>Buy
                                </label>
                                <label>
                                    <input type="radio" id="borrow" name="category" value="borrow" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/>Borrow
                                </label>
                                <label>
                                    <input type="radio" id="donate" name="category" value="donate" onClick= {this.DateEnable.bind(this)} onChange={this.handleCategoryChange}/>Donate
                                </label>
                    </div>
                    <br></br>
                    <div className="description">
                                              <input
                                                  type="text"
                                                  placeholder="description"
                                                  name="description"
                                                  value={this.state.description}
                                                  onChange={this.handleDescriptionChange} required
                                              />
                                        
                    </div>
                    <div className="address">
                                              <input
                                                  type="text"
                                                  placeholder="address"
                                                  name="address"
                                                  value={this.state.address}
                                                  onChange={this.handleAddressChange} required
                                              />
                                        
                    </div>
                    From:<input
                            type="date"
                            placeholder="From Date"
                            name="from2"
                            id="from2"
                            min={today}
                            value={this.state.from2}
                            visibility="hidden"
                            onChange={this.handleFromChange} required
                            
                        />
                    <p>  </p>To:<input
                            type="date"
                            placeholder="To Date"
                            name="to2"
                            id="to2"
                            min={this.state.from2}
                            value={this.state.to2}
                            visibility="hidden"
                            onChange={this.handleToChange} required
                           
                        />
                          
			
					<input type="submit" value="Update" onClick={this.handleUpdate}/>
				</form>
			</div>
      </div>
      
    );
  }
}


export default EditItem;