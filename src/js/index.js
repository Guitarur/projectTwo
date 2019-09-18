var root = window.player;
var songList = [];
var newIndex = 0;
var len = 0;
var audio = root.audioManager;
var control;
var like = root.like;
var timer;

function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            console.log(data);
            songList = data;
            len = data.length;
            control = new root.control(len,newIndex);
            root.songList.renderList(data);
            bindEvent();
            bindTouch(); 
            $('body').trigger('play:change',0);
        },
        error: function () {
            console.log('err');
        }
    })
}

function bindEvent() {
    $('body').on('play:change',function(e,index) {
        root.render(songList[index]);
        audio.getAudio(songList[index].audio);
        root.pro.renderAlltime(songList[index].duration);
        newIndex = index;
        if(audio.status == 'play'){
            audio.play();
            rotate(0);

        }
        $('.img-box').attr('data-deg',0);
        $('.img-box').css({
            'transform': 'rotateZ('+ 0 +'deg)',
            "transition": 'none'
        })
        
    });
    $('.pre').on('click',function () {
        var i = control.pre();
        $('body').trigger('play:change',i);
        root.pro.start(0);
        if (audio.status == 'pause'){
            audio.pause();   
        }
        root.pro.stop();
    });
    $('.next').on('click',function () {
        var i = control.next();
        $('body').trigger('play:change',i);
        root.pro.start(0);
        if (audio.status == 'pause'){
            audio.pause();
            // root.pro.stop();
        }
        root.pro.stop();
    });
    $('.play').on('click',function () {
        var status = audio.status;
        if(status == 'pause'){
            audio.play();
            root.pro.start();
            var deg = $('.img-box').attr('data-deg');
            rotate(deg);
            $('.play').addClass('playing');
        }else{
            audio.pause();
            root.pro.stop();
            clearInterval(timer);
            $('.play').removeClass('playing');
        }
    });
    $('.like').on('click',function () {
        like.islike(songList[newIndex]);
        console.log(newIndex);
    })
    $('.list').on('click',function () {
        $('.song-list').css({
            'height': 'auto',
        })
    })
    $('.song-list ul li').forEach(function (ele,index) {
        ele.onclick = function () {
            $('body').trigger('play:change',index);
            control = new root.control(len,index);
            $('.song-list').css({
                'height': '0',
            })
            root.pro.start(0);
            if (audio.status == 'pause'){
                audio.pause();   
            }
            root.pro.stop();
            }
    })
}

function rotate(deg) {
    clearInterval(timer);
    deg = +deg; 
    timer = setInterval(function () {
        deg += 2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform': 'rotateZ('+ deg +'deg)',
            'transition': 'all 0.2s linear'
        })
    },200);    
}
function bindTouch() {
    var offset = $('.pro-wrap').offset();
    var left = offset.left;
    var width = offset.width;
    $('.slider').on('touchstart',function () {
        // console.log('touch');
        root.pro.stop();
    }).on('touchmove',function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per < 1) {
            root.pro.update(per);
        }
    }).on('touchend',function (e){
        var x = e.changedTouches[0].clientX;
        var per = (x - left) / width;
        if(per > 0 && per < 1) {
            var duration = songList[newIndex].duration;
            $('.play').addClass('playing');
            var curTime = per * duration;
            audio.status = 'play';
            audio.playTo(curTime);
            audio.play();
            root.pro.start(per);

        }
    })
}

getData('../mock/data.json');

//点击弹出列表框，点击内容或空白收回

// 点击单曲进行播放