/**
 * Created by Administrator on 15-6-25.
 */
  var title_arr=["孕育宝典","收藏","历史纪录","设置"];
  var myScroll=new IScroll("#myScroll",{})
  window.onload=function(){
      $(".scroll").height($(".main").height())
      myScroll.refresh()
  }
   var dataArr=[];
   var i=0;
   var curInd=0;
   var history_item= $.parseJSON(localStorage.getItem('h'));
   var save_item=$.parseJSON(localStorage.getItem('f'));
   console.log(localStorage);

    /*首页点击*/
   $(".main_img li").off("tap").on("tap",function(){
       var data_Html=""
        dataArr=[];
        curInd=$(this).index()+1;
        getData(curInd);

       $("#back_btn").css({"display":"block"})
       $(".title").text($(this).attr("title"))
       data_Html+="<ul class='list_item'>"
       $.each(dataArr,function(k,item){
           data_Html+="<li><img src='img/tu/"+i+".jpg'><span>"+item.substring(2)+"</span></li>";
           i++;
           if(i>73){
               i=0;
           }
       })
       data_Html+="</ul>";
       $(".page_4 .body_1").html(data_Html).css({
           "z-index":11
       }).addClass("on").siblings().removeClass("on");
       $(".page_4").css({
           "z-index":11,
           "-webkit-transform":"translate(100%)"
       }).animate({
            "translate":0
           }).siblings().css({
               "z-index":10
           }).animate({
               "translate":"-100%"
           })


       /*二级页面点击*/
       $(".list_item li").off("tap").on("tap",function(){
           $("footer ul li").eq(0).addClass("on").siblings().removeClass("on");
           $("header span").addClass("save_btn").removeClass("sel_btn")
           $(".title").text($(this).text())
           var cur_key=curInd+"_"+$(this).text();
           var data_Html="";
           data_Html+="<p class='mess'>"+localStorage.getItem(cur_key)+"</p>";
           $(".page_4 .body_2").html(data_Html).addClass("on").css({
                   "z-index":9,
                   "-webkit-transform":"translate(100%)"
               }).animate({
                   "translate":0
               }).siblings().css({
                   "z-index":8
               }).animate({
                   "translate":"-100%"
               }).removeClass("on");

           /*历史记录*/
           historyPage($(this));
       });

   })
    /*底部导航的点击事件*/
    $("footer ul li").on("tap",function(){
        $("header span").addClass("sel_btn").removeClass("save_btn");
        /*判断当前位置，如果当前位置对应的page显示，则返回，不继续执行*/
        if($(this).hasClass("on")){
            return false;
        }
        $(this).addClass("on").siblings().removeClass("on");
        var tap_ind=$(this).index();
        $(".title").text(title_arr[tap_ind]);

        $("#myScroll .main").eq(tap_ind).css({
            "z-index":11,
            "-webkit-transition": "-webkit-transform 0s linear 0s",
            "transition": "-webkit-transform 0s linear 0s",
            "-webkit-transform":"translate(100%)"
        }).animate({
                "translate":0
        },500,"ease",function(){
            $(this).addClass("show");
        }).siblings().css({
            "-webkit-transition": "-webkit-transform 0s linear 0s",
            "transition": "-webkit-transform 0s linear 0s"
        }).animate({
            "translate":"-100%"
        },function(){
            $(this).removeClass("show")
        }).css({
            "z-index":10
        })

        $(".page_4 div").css({
            "-webkit-transform":"translate(0)"
        })

    })

    /*获取数据*/
   function getData(ind){
       for(key in localStorage){
           if(key.substring(0,1).indexOf(ind)!=-1){
               dataArr.push(key)
           }
       }
   }

    /*保存历史记录*/
var j=0
   function historyPage(This){
       console.log(j++)
       history_item.push(This.text());
       var history_html="";
       history_html+="<ul class='his_item'>";
       localStorage.setItem("h",history_item.toString());
       for(key in history_item){
           history_html+="<li>"+history_item[key]+"</li>"
       }
       history_html+="</ul>";
       $(".page_2").html(history_html);
   }

    $(".his_item li").off("tap").live("tap",function(){
        $("footer ul li").eq(0).addClass("on").siblings().removeClass("on");
        $(".title").text($(this).text())
        var cur_key=curInd+"_"+$(this).text();
        var data_Html="";
        data_Html+="<p class='mess'>"+localStorage.getItem(cur_key)+"</p>";
        $(".mess").css({
            "font-size": "20px"
        })
        $(".page_4 .body_2").html(data_Html).addClass("on").css({
            "z-index":9,
            "-webkit-transform":0
        }).siblings().css({
                "z-index":8,
                "-webkit-translate":"-100%"
            }).removeClass("on");

        $(".page_4").css({
            "z-index":11,
            "-webkit-transform":"translate(100%)"
        }).animate({
                "translate":0
            },function(){
                $(this).addClass("show");
            }).siblings().animate({
                "translate":"-100%"
            },function(){
                $(this).removeClass("show")
            }).css({
                "z-index":10
            })

    });




    /*点击返回事件*/
    $("#back_btn").off("tap").on('tap',function(){
        if($(".body_2").hasClass("on")){
            $("header span").addClass("sel_btn").removeClass("save_btn")
            $(".body_1").css({
                "z-index":9
            }).animate({
                    "translate":0
                },function(){
                    $(this).addClass("on")
                }).siblings().animate({
                    "translate":"100%"
                },function(){
                    $(this).removeClass("on")
                }).css({
                    "z-index":8
                })
            $(".body_2").html(" ")

        }else{

            $("#back_btn").css({
                display:"none"
            })
            $("main").eq(0).addClass("on").siblings().removeClass("on");
            $(".title").text(title_arr[0])
            $(".body_1").removeClass("on")
            $(".main_body").css({
                "z-index":11,
                "-webkit-transform":"translate(100%)"
            }).animate({
                    "translate":0
                }).siblings().css({
                    "z-index":10
                }).animate({
                    "translate":"-100%"
                },function(){
                    $(".body_1").html(" ")
                })
        }

})

    /*设置字体大小*/
    $(" .page_3 .size_btn input").on("tap",function(){
        var font_size=$(this).attr("data-id")+"px";
        alert(font_size)
        $("#wrap .main .mess").css({
            "fontSize": font_size
        })
    })

    /*点击收藏*/

    $("header .save_btn").live("tap",function(){
        var save_num=parseInt($(".save_num").text());
        if(isNaN(save_num)){
            save_num=0
        }else{
            save_num=save_num
        }
        $(".save_num").text(save_num+1)
        var save_data=$("header .title").text();
        save_item.push(save_data);
        var save_html="";
        save_html+="<ul class='his_item'>";
        localStorage.setItem("f",save_item.toString());
        for(key in save_item){
            save_html+="<li>"+save_item[key]+"</li>"
        }
        save_html+="</ul>";
        $(".page_1").html(save_html)
    })


    /*点击查找*/
   /* $("header .sel_btn").on("tap",function(){
        $("header").css({
            "display":"none"
        })

        $("#search_box").css({
            "display":"block"
        })

        $(".page_5").css({
            "z-index":11,
            "-webkit-transform":"translate(100%)"
        }).animate({
                "translate":0
            }).siblings().css({
                "z-index":10
            }).animate({
                "translate":"-100%"
            })
    })

    *//**//*查找事件*//**//*
    $("#search_text").keyup(function(){
        var se_txt= $.trim($(this).val());
        var search_result=search(se_txt);
        if(se_txt==""){
            return false;
        }
        console.log(search_result)
        var search_html="";
        search_html+="<ul class='his_item'>";
        $.each(search_result,function(k,item){
            search_html+="<li>"+item+"</li>"
        })
        search_html+="</ul>";
        $(".search_result").html(search_html)
    })

    function search(txt){
        var search_data=[];
        for(key in localStorage){
            if(key.indexOf(txt)!=-1){
               search_data.push(key)
            }

        }
        return search_data;
    }*/





