function cssTransform(element, attr, val) {
    //2、设置一个存储transform的值
    if (!element.transform) {
        element.transform = {};
    }

    //1、判断是设置还是获取
    if (typeof val === 'undefined') {//获取
        //undefinde:说明我们没有对指定的属性进行过设置，这是后返回默认值，也就是0；

        if (!element.transform[attr]) {
            //
            switch (attr) {
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    //避免js进度的问题
                    element.transform[attr] = 100;
                    break;
                default:
                    element.transform[attr] = 0;
            }
        }
        return element.transform[attr];

    } else {//设置
        element.transform[attr] = val;
        var transformVal = '';
        for (var i in element.transform) {
            switch (i) {
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                case 'scaleZ':
                    transformVal += ' ' +  i + '(' + (element.transform[i] / 100) + ')';
                    break;
                case 'rotate':
                case 'rotateX':
                case 'rotateY':
                case 'rotateZ':
                case 'skew':
                case 'skewX':
                case 'skewY':
                    transformVal += ' ' + i + '(' + element.transform[i] + 'deg)';
                    break;
                default:
                    transformVal += ' ' + i + '(' + element.transform[i] + 'px)';
            }
        }
        element.style.transform = transformVal;
    }
}