import React, { Component} from 'react';

// This is to set up our context to store our state.
const Context = React.createContext();

// This is our reducer, which updates our state.
const reducer = (state, action) => {
  switch(action.type){
    // case to delete a contact
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter (
          contact => contact.id !== action.payload
        )
      };
      // case to add a new contact
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
      // case to update an existing contact
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(
          contact => contact.id === action.payload.id ? (contact = action.payload) : contact)
      }
      default:
      return state;

  }
};

// The provider class is the wrapper which holds the state for our application
export class Provider extends Component {
  state = {
    // set up the contacts array with inital values.
    contacts: [{
      id: "1",
      name: 'Sanjith Das',
      email: 'sdas@gmail.com',
      phone: '(555)-222-5555'
    },
    {
      id: "2",
      name: 'Jack Blogs',
      email: 'jackblogs@gmail.com',
      phone: '(465)-345-3523'
    },
    {
      id: "3",
      name: 'Alex Harry',
      email: 'alexharry@gmail.com',
      phone: '(723)-942-3842'
    }],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  }; // end of the state. 
  
  render(){
    return(
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
} // end of provider

export const Consumer = Context.Consumer;