window.addEventListener('load', function() {
    // 按下s键，自动定位到搜索框
    var search = document.querySelector('.search');
    var input = search.querySelector('input');
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 83) {
            input.focus();
            console.log('s');
        }
    })
    // 侧边栏滚动
    var elevater = document.querySelector('.elevater');
    // 获取导航到顶部的距离
    var ele_top = elevater.offsetTop;
    var goback = document.querySelector('.goback');
    document.addEventListener('scroll', function() {
        // console.log(window.pageYOffset);
        if (window.pageYOffset >= ele_top) {
            goback.style.display = 'block';
        } else {
            goback.style.display = 'none';
        }
    })
    goback.addEventListener('click', function() {
        animateY(window, 0);
    })
    function animateY(obj, target, callback) {
        // console.log(callback);  callback = function() {}  调用的时候 callback()
    
        // 先清除以前的定时器，只保留当前的一个定时器执行
        clearInterval(obj.timer);
        obj.timer = setInterval(function() {
            // 步长值写到定时器的里面
            // 把我们步长值改为整数 不要出现小数的问题
            // var step = Math.ceil((target - obj.offsetLeft) / 10);
            var step = (target - window.pageYOffset) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (window.pageYOffset == target) {
                // 停止动画 本质是停止定时器
                clearInterval(obj.timer);
                // 回调函数写到定时器结束里面
                // if (callback) {
                //     // 调用函数
                //     callback();
                // }
                callback && callback();
            }
            // 把每次加1 这个步长值改为一个慢慢变小的值  步长公式：(目标值 - 现在的位置) / 10
            // obj.style.left = obj.offsetLeft + step + 'px';
            window.scroll(0, window.pageYOffset + step);
    
        }, 15);
    }
    // 轮播图开始
    var focus = document.querySelector('.focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    var focusWidth = focus.offsetWidth;
    var num = 0;
    var circle = 0;
    var arrow_r = document.querySelector('.arrow_r');
    var arrow_l = document.querySelector('.arrow_l');
    focus.addEventListener('mouseenter', function() {
        arrow_r.style.display = 'block';
        arrow_l.style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function() {
        arrow_r.style.display = 'none';
        arrow_l.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    });
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol.appendChild(li);
        li.addEventListener('click', function() {
            if (flag) {
                flag =false;
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                // 先将ul加定位才可以做动画,是ul在移动
                var index = this.getAttribute('index');
                num = index;
                circle = index;
                // console.log(index);
                // console.log(focusWidth);
                animate(ul, -index * focusWidth, function() {
                    flag = true;
                });
            }
        })
    }
    ol.children[0].className = 'current';
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 节流阀
    var flag = true;
    arrow_r.addEventListener('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            if (num == ul.children.length-1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    });
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            circle--;
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ?  ol.children.length - 1 : circle;
            circleChange();
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
})