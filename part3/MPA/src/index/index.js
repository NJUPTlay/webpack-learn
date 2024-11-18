import { helloworld } from './hello';
import { test } from '../common/test';
document.write(helloworld());
test()
if (module.hot) {
    module.hot.accept('./hello.js', function() { //告诉 webpack 接受热替换的模块
        console.log('Accepting the updated printMe module!');
        
        document.write(helloworld());
    })
}