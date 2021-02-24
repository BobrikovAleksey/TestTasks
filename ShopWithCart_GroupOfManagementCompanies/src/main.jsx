import 'Styles/main';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'Store';

import { Card } from 'Components/card';

const messageData= ['hello', 'hi', 'goodbye'];

const Message = ({ text }) => {
    return (<li>{ text }</li>);
};

const MessageList = ({ list }) => {
    const elementList = list.map((el, key) => <Message text={ el } key={ key } />);
    return <ul>{ elementList }</ul>;
};

class App extends React.Component {
    state = {
        counter: 0,
    };

    handleClickInc = () => {
        this.setState((prevState) => ({ counter: prevState.counter + 1 }));
    };

    render() {
        return <div>
            <Card />

            <p>{ this.state.counter }</p>
            <button onClick={this.handleClickInc}>Добавить сообщение</button>

            <MessageList list={ messageData } />
        </div>;
    }
}

ReactDom.render(
    <Provider store={ store }>
        <App />
    </Provider>,
    document.querySelector('#root')
);
