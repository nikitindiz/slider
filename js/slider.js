$(document).ready(function(){

  function log_debug(debug_data)
  {
    // $('div.debug').append('<p>'+debug_data+'</p>');
  }

  // Detect browser
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
    return M.join('');
  })();


  function is_ie()
  {
    if((navigator.sayswho == 'MSIE7') ||
       (navigator.sayswho == 'MSIE8') ||
       (navigator.sayswho == 'MSIE9')
      )
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  // Preloading img content
  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
  }

  // Init container sizes
  $(window).load(function(){

    var document_images = [];

    for (var i = 0; i <= main_counter; i++)
    {
      document_images.push($("ul.slider-images li").eq(i).find('img').attr('src') );
      // console.log( 'document_images = ' + document_images[i] );
    }

    preload(document_images);

    get_images_ratio();

    if(is_ie())
    {
      // $("ul.slider-images li").css({'display' : 'none'});
    }
    else
    {
      $("ul.slider-images li").css({'display' : 'block'});
    }
  });

  var main_counter = $("ul.slider-images li").length-1;
  var counter = 0;

  var cycle_count = 0;
  var images_ratio = [];

  // On window resize recalc containers
  $(window).resize(function(){
    recenter_images();
  });

  // Function - get images ratio
  function get_images_ratio(){
    for (var i = 0; i <= main_counter; i++)
    {
      images_ratio.push($("ul.slider-images li").eq(i).find('img').width() / $("ul.slider-images li").eq(i).find('img').height() );
      // log_debug('ratio = ' + images_ratio[i]);
      // console.log( 'ratio = ' + images_ratio[i] );
    }
  }


  // Resize container to fit image perfectly
  function resise_current_parent(parent_id)
  {
    if( (($("ul.slider-images li").eq(parent_id).width() / images_ratio[parent_id]) < $("ul.slider-images li").eq(parent_id).height()) &&
          !$("ul.slider-images li").eq(parent_id).hasClass('ratio-calculated') )
    {
      var new_width = images_ratio[parent_id] * $("ul.slider-images li").eq(parent_id).height() + 'px';
      $("ul.slider-images li").eq(parent_id).css({'min-width' : new_width});
      $("ul.slider-images li").eq(parent_id).addClass('ratio-calculated');

    }
  }

  // Recenter all images
  function recenter_images()
  {
    for (var i=0; i<=main_counter; i++)
    {

      resise_current_parent(i);
      recenter_one_image(i);
      // console.log('recentering all images');
    }
  }

  // Recenter one image
  function recenter_one_image(i)
  {
    var top_offset = ($("ul.slider-images li").eq(i).height() - $("ul.slider-images li").eq(i).find('img').height()) / 2 + 'px';
    var left_offset = ($("ul.slider-images").width() - $("ul.slider-images li").eq(i).width()) / 2 + 'px';
    $("ul.slider-images li").eq(i).find('img').css({'top' : top_offset});
    $("ul.slider-images li").eq(i).css({'margin-left' : left_offset});
    //log_debug('$("ul.slider-images li").eq(i).height() = '+$("ul.slider-images li").eq(i).height());
    //log_debug('$("ul.slider-images li").eq(i).find(\'img\').height() = '+$("ul.slider-images li").eq(i).find('img').height());
   //alert('top_offset  = '+top_offset );
   //alert('left_offset  = '+left_offset );
  }


  // Main slider function
  function Fader(){
    var i = setInterval(function() {

      var next_child =  (counter == 0) ? main_counter : counter - 1;

      recenter_images();

      if (cycle_count > 0)
      {
        if(is_ie())
        {
          //alert('ie1');
        }
        else
        {
          $("ul.slider-images li").eq(next_child).find('img').delay(1000).queue(function(next){
              $(this).toggleClass('faded-and-zoomed');
              next();
          });
        }
      }
      else
      {
        recenter_images();
        $('.slider-spinner').hide(function(){
          $("ul.slider-images").animate({backgroundColor : '#000000'}, 200);
        });
      }

      if(is_ie())
      {
        $("ul.slider-images li").eq(next_child).hide(); //find('img').stop(true,false);
        //$("ul.slider-images li").eq(next_child).delay(100).fadeIn(900).delay(3000);
        $("ul.slider-images li").eq(counter).show(); //fadeOut(900);
      }
      else
      {
        $("ul.slider-images li").eq(counter).find('img').toggleClass('faded-and-zoomed');
      }

      $('.slider-images-title').html($("ul.slider-images li").eq(counter).find('img').attr('alt'));

      cycle_count++;
      counter++;

      if (counter > main_counter) {
          counter = 0;
      }
    }, 5000);
  }


  function ie_Fader()
  {
    for(var i=0;i<=main_counter;i++)
    {
      $("ul.slider-images li").eq(i).find('img').css({'display' : 'none'});
    }

    var i = setInterval(function() {

      var next_child =  (counter == 0) ? main_counter : counter - 1;

      if (cycle_count == 0)
      {
        $('.slider-spinner').hide(function(){
          $("ul.slider-images").animate({backgroundColor : '#000000'}, 200);
         // recenter_one_image(0);
        });
      }

      recenter_images();

      $("ul.slider-images li").eq(next_child).find('img').css({'z-index' : '10'}).fadeIn(500).delay(4000).fadeOut(1500).css({'z-index' : '1'});
      $('.slider-images-title').html($("ul.slider-images li").eq(counter).find('img').attr('alt'));


      cycle_count++;
      counter++;

      if (counter > main_counter) {
          counter = 0;
      }
    }, 5000);
  }

  // Call slider
  if(is_ie())
  {
    ie_Fader();
  }
  else
  {
    Fader();
  }


});
