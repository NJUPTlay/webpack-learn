import logo from './images/logo.jpg';
import './index.less';
import { test } from '../common/test';

test()

class Search extends React.Component {

    render() {
        return <div className="search-text">
            搜索文字的内容<img width={50} height={50} src={ logo } />
        </div>;
    }
}
//这里需要注意react bandler的版本问题，如果使用的是react18，那么需要使用createRoot方法
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<Search />);