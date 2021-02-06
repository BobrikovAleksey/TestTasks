import React from 'react';
import ReactDom from 'react-dom';

const messageData= ['hello', 'hi', 'goodbye', 'by'];

const Message = ({ text }) => {
    return (<li>{ text }</li>);
};

const MessageList = ({ list }) => {
    const elementList = list.map((el, key) => <Message text={ el } key={ key } />);
    return <ul>{ elementList }</ul>;
};

ReactDom.render(
    <MessageList list={ messageData } />,
    document.querySelector('#root')
);
