(function ($,root) {

    function renderImg(src) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
            $('.img-box img').attr('src',src);
            root.blurImg( img, $('body') );
        }
    }

    function renderInfo(info) {
        var str =  '<div class="son-name">'+ info.song +'</div>\
        <div class="singer">'+ info.singer +'</div>\
        <div class="album">'+ info.album +'</div>';
        
        $('.song-info').html(str);
    }

    function renderIsLike(like) {
        if(like) {
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');
        }
    }    
    root.render = function (data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
        
    }; 

})(window.Zepto,window.player || (window.player = {}));