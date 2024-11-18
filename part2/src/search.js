'use strict';

import React from 'react';
import ReactDOM from 'react-dom/client';
import logo from './images/logo.jpg';
import './search.less';


class Search extends React.Component {

    render() {
        return <div className="search-text">
            搜索文字的内容<img width={50} height={50} src={ logo } />
        </div>;
    }
}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Search />);