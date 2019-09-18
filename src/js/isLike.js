(function ($,root){
    function Like() {

    }

    Like.prototype = {
        islike: function (data) {
            console.log(data);
            if(data.isLike){
                data.isLike = false;
                $('.like').removeClass('liking');
            } else{
                data.isLike = true;
                $('.like').addClass('liking');
            }   
        }
    }

    root.like = new Like();
})(window.Zepto,window.player || (window.player = {}))