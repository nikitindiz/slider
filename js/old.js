$(document).ready(function(){

    var main_counter = $("ul.slider-images li").length-1;
    var counter = 0;

    var cycle_count = 0;
    var images_ratio = [];

    $(window).on('resize',function(){
      recenter_images();
    });


    function get_images_ratio(){
      for (var i = 0; i <= main_counter; i++)
      {
        images_ratio.push($("ul.slider-images li").eq(i).find('img').width() / $("ul.slider-images li").eq(i).find('img').height() );
        console.log('getting ratio');
      }
    };


    function resise_current_parent(parent_id)
    {
      if( (($("ul.slider-images li").eq(parent_id).width() / images_ratio[parent_id]) < $("ul.slider-images li").eq(parent_id).height()) &&
            !$("ul.slider-images li").eq(parent_id).hasClass('ratio-calculated') )
      {
        var new_width = images_ratio[parent_id] * $("ul.slider-images li").eq(parent_id).height() + 'px';
        $("ul.slider-images li").eq(parent_id).css({'min-width' : new_width});
        $("ul.slider-images li").eq(parent_id).addClass('ratio-calculated');

        console.log('resizing current parent');
      }

    }

    function recenter_images()
    {
      for (var i=0; i<=main_counter; i++)
      {
        recenter_one_image(i);
        resise_current_parent(i);
        console.log('recentering all images');
      }
    }

    function recenter_one_image(i)
    {
      var top_offset = ($("ul.slider-images li").eq(i).height() - $("ul.slider-images li").eq(i).find('img').height()) / 2 + 'px';
      var left_offset = ($("ul.slider-images").width() - $("ul.slider-images li").eq(i).width()) / 2 + 'px';
      // console.log($("ul.slider-images").width() +'x'+ $("ul.slider-images li").eq(i).width());
      $("ul.slider-images li").eq(i).find('img').css({'top' : top_offset});
      $("ul.slider-images li").eq(i).css({'margin-left' : left_offset});
      console.log('recentering one image');
    }

    recenter_images();


    function Fader(){
    var i = setInterval(function() {
       //$("ul.images li").eq(counter - 1).find('img').stop(true,false);
       //$("ul.images li").eq(counter - 1).find('img').css({'width': '100%', 'margin-left' : '0px', 'margin-top' : '0px'});
       //$("ul.images li").eq(counter - 1).find('img').animate({'width': '150%', 'margin-left' : '-25%', 'margin-top' : '-25%'},8000,"linear");
        //$("ul.images li").eq(counter - 1).delay(100).fadeIn(900).delay(3000);
       // $("ul.images li:visible").fadeOut(900);//.delay(100).find('img').removeAttr('style');
        var next_child =  (counter == 0) ? main_counter : counter - 1;
        // resise_current_parent(next_child);
//        recenter_one_image(counter);

        if (cycle_count > 0)
        {
          $("ul.slider-images li").eq(next_child).find('img').delay(1000).queue(function(next){
              $(this).toggleClass('faded-and-zoomed');
              next();
          });
          console.log('adding fader to next image');
        }
        else
        {
          get_images_ratio();
          recenter_images();
          recenter_images();
          console.log('first loop');
        }

        $("ul.slider-images li").eq(counter).find('img').toggleClass('faded-and-zoomed');
        console.log('adding fader to current');

        cycle_count++;
        counter++;

        if (counter > main_counter) {
            counter = 0;
        }
    }, 5000);

    }


     // $("ul.images li").hide();

     Fader();

      navigator.sayswho= (function(){
        var ua= navigator.userAgent, tem,
        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if(/trident/i.test(M[1])){
            tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }
        if(M[1]=== 'Chrome'){
            tem= ua.match(/\bOPR\/(\d+)/)
            if(tem!= null) return 'Opera '+tem[1];
        }
        M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
        if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
        return M.join(' ');
      })();

      // alert(navigator.sayswho);

});
