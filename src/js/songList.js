(function ($,root) {
    function renderList(data) {
        var str = '';
        data.forEach(function (ele,index){
            console.log(ele);
            str += '<li>'+ ele.song + '-' + ele.singer + '</li>'
        })
        $('.song-list ul').html(str);
    }

    root.songList = {
        renderList: renderList   
    }

})(window.Zepto,window.player || (window.player = {}))