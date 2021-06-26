window.addEventListener('load', function() {
    // tab切换
    var detail_list = document.querySelector('.detail_list');
    var lis = detail_list.getElementsByTagName('li');
    var items = document.querySelectorAll('.item');
    for (var i = 0; i < lis.length; i++) {
        lis[i].setAttribute('index', i)
        lis[i].onclick = function() {       
            for (var i = 0; i < lis.length; i++) {
                lis[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            console.log(index);
            for (var i = 0; i < lis.length; i++) {
                items[i].style.display = 'none';
            }
            items[index].style.display = 'block';
        }
    }
    // 放大镜效果
    var pre_img = document.querySelector('.pre_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    pre_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    pre_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    pre_img.addEventListener('mousemove', function(e) {
        // 需确保所有父级没有定位属性才可以用
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        var maskX = x - (mask.offsetWidth / 2);
        var maskY = y -(mask.offsetHeight / 2);
        // 正方形盒子宽高一样
        var maskMax = pre_img.offsetWidth - mask.offsetWidth;
        // 不得超过左边
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            // 不得超过右边
            maskX = maskMax;
        }
        // 不得超过上边
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            // 不得超过下边
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图片最大移动距离
        var bigImg = document.querySelector('.bigImage');
        var bigMax = big.offsetWidth-bigImg.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = bigX + 'px';
        bigImg.style.top = bigY + 'px';
    })
})