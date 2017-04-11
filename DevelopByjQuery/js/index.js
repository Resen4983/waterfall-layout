$( window ).on( "load", function(){
    waterfall('main','box');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
            $.each( dataInt.data, function( index, value ){
                var $oBox = $('<div>').addClass('box').appendTo( $( "#main" ) );
                var $oPic = $('<div>').addClass('pic').appendTo( $oBox );
                $('<img>').attr('src','./images/' + $( value).attr( 'src') ).appendTo($oPic);
            });
            waterfall();
        };
    }
});


function waterfall(parent,box){
    var $aBox = $( "#main>div" );
    var aBoxW = $aBox.eq( 0 ).outerWidth();
    var num = Math.floor( $( window ).width() / aBoxW );

        // $( "#main" ).width(aBoxW * num).css('margin','0 auto');
$("#main").css({width:aBoxW*num,margin:"0 auto"});
    var boxHArr=[];

    $aBox.each( function( index, value ){
        var boxH = $aBox.eq( index ).height();
        if( index < num ){
            boxHArr[ index ] = boxH; 
        }else{
            var minH = Math.min.apply( null, boxHArr );
            var minHIndex = $.inArray( minH, boxHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': $aBox.eq( minHIndex ).position().left
            });
        
            boxHArr[ minHIndex ] += $aBox.eq( index ).height() + 15;
        }
    });
}

function checkscrollside(){
    var $aBox = $( "#main>div" );
    var lastBoxH = $aBox.last().get(0).offsetTop + Math.floor($aBox.last().height()/2);
    var scrollTop = $( window ).scrollTop()
    var documentH = $( document ).height();
    return (lastBoxH < scrollTop + documentH ) ? true : false;
}