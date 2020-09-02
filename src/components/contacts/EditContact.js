import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getContact, updateContact } from '../../actions/contactAction';
class EditContact extends Component {
// The state for this component.
state = {
name: '',
email: '',
phone: '',
errors: {},
};

componentWillReceiveProps(nextProps, nextState){
const { name, email, phone } = nextProps.contact;
this.setState({
// name is the same as name: name in this case
name,
email,
phone
});
}
componentDidMount(){
// get our id from our url.
const { id } = this.props.match.params;
this.props.getContact(id);
}

onChange = e => {
this.setState({
[e.target.name]: e.target.value
});
}

// this function will be called when the form is submitted.
handleSubmit = (e) => {
e.preventDefault();
console.log("Submit: update")
const { name, email, phone } = this.state;

// Check for Errors
if (name === ''){
this.setState({ errors: {name: 'Name is required '}});
return; // this will stop the onSubmit from running
}
if (email === ''){
this.setState({ errors: {email: 'Email is required '}});
return; // this will stop the onSubmit from running
}
if (phone === ''){
this.setState({ errors: {phone: 'Phone is required '}});
return; // this will stop the onSubmit from running
}

const { id } = this.props.match.params;
// create a updated Contact object 
const updContact = {
id,
name,
email,
phone
}

// send the updated contact to an api or state managment.
console.log(updContact);

// Call the updateContact function
this.props.updateContact(updContact);

this.props.history.push("/");
}

render() {
const { name, email, phone, errors } = this.state;
return (
<Fragment>
<h1 className="display-4 text-primary">Edit Contact</h1>
<div className="card mb-3">
<div className="card-header">Update Contact</div>
<div className="card-body">
<form onSubmit={this.handleSubmit}>
<div className="form-group">
<label>Name</label>
<input 
type="text" 
className={classnames("form-control", { 'is-invalid' : errors.name }) }
placeholder="Name"
name="name"
// set the default value for the form (contact.name)
// defaultValue={contact.name}
// use the nameInput ref here
value={name}
onChange={this.onChange}

/>
{errors.name && <div className='invalid-feedback'>{errors.name}</div>}
</div>
<div className="form-group">
<label>Email</label>
<input 
type="email" 
className={classnames("form-control", { 'is-invalid' : errors.email }) }
placeholder="Email"
name="email"
// set the default value for the form (contact.email)
value={email}
// use the emailInput ref here
onChange={this.onChange}

/>
{errors.email && <div className='invalid-feedback'>{errors.email}</div>}
</div>
<div className="form-group">
<label>Phone</label>
<input 
type="text" 
className={classnames("form-control", { 'is-invalid' : errors.phone }) } 
placeholder="Phone"
name="phone"
// set the default value for the form (contact.phone)
value={phone}
// use the phoneInput ref here
onChange={this.onChange}
/>
{errors.phone && <div className='invalid-feedback'>{errors.phone}</div>}
</div>
<input type="submit" value="Update Contact" className="btn btn-light btn-block" />
</form>
</div>

</div> {/* end of the card */}
</Fragment> 
)
}
}
EditContact.propTypes = {
contact: PropTypes.object.isRequired,
getContact: PropTypes.func.isRequired,
updateContact: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
contact: state.contact.contact
});
export default connect(mapStateToProps, { getContact, updateContact})(EditContact);