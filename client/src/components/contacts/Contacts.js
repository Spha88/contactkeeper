import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactItem from './ContactItem';
import ContactContext from '../../context/contact/contactContext';

const Contacts = () => {
   const contactContext = useContext(ContactContext);
   const { loadContacts, contacts, filtered } = contactContext;

   useEffect(() => {
      loadContacts();
   }, [contacts]);

   if (contacts.length === 0) {
      return <h4>Please add contacts</h4>;
   }

   return (
      <Fragment>
         <TransitionGroup>
            {filtered !== null
               ? filtered.map(contact => (
                    <CSSTransition
                       key={contact._id}
                       timeout={500}
                       classNames='item'
                    >
                       <ContactItem contact={contact} />
                    </CSSTransition>
                 ))
               : contacts.map(contact => (
                    <CSSTransition
                       key={contact._id}
                       timeout={500}
                       classNames='item'
                    >
                       <ContactItem contact={contact} />
                    </CSSTransition>
                 ))}
         </TransitionGroup>
      </Fragment>
   );
};

export default Contacts;
