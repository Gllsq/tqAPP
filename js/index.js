$(function(){
    let weather;
    //请求数据
    $.ajax({
        url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
        dataType:"jsonp",
        success:function(res){
            weather=res.data.weather;
            console.log(weather);
            render(weather)
        }

    })

    //渲染数据
    function render(obj){
        $(".banner .banner_left h3").html(obj.city_name+"市");
        $(".banner .air h3").html(obj.aqi);
        $(".banner .degree h3").html(obj.current_temperature+"°");
        $(".banner .degree h2").html(obj.day_condition);
        $(".day .lt1 h3").html(obj.day_condition);
        $(".day .lt2 h3").html(obj.tomorrow_condition);
        $(".day .lt1 h4").html(obj.dat_high_temperature+"/"+"-"+obj.dat_low_temperature+"°C");
        $(".day .lt2 h4").html(obj.tomorrow_high_temperature+"/"+"-"+obj.tomorrow_low_temperature
            +"°C");
        $(".day .lt1 .noe").css("background-image",`url("img/${obj.dat_weather_icon_id}.png")`);
        $(".day .lt2 .two").css("background-image",`url("img/${obj.tomorrow_weather_icon_id}.png")`);


        //数组
        obj.hourly_forecast.forEach(function(item,index){
            let str="";
            str=`<li>
                     <p>${item.hour}:00</p>
                     <div class="tup" style="background:url(img/${item.weather_icon_id}.png) no-repeat"></div>
                     <h3>${item.temperature}°</h3>
                 </li>`;
            $(".hour .hours").append(str);

        })
        let arr=obj.forecast_list.slice(0,6);
        console.log(arr);
        arr.forEach(function(value){
            let str="";
            str=`<div class="bot">
            <p>昨天</p>
            <h2>${value.date.substring(5,7)}/${value.date.substring(8,10)}</h2>
            <h3>多云</h3>
            <div class="tu" style="background:url(img/${value.weather_icon_id}.png) no-repeat"></div>
        </div>`;
            $(".everyday .ever_top").append(str);

        })


        let arr1=obj.forecast_list.slice(0,6);
        arr1.forEach(function(time){
            let str="";
            str=`<div class="bon">
                        <div class="tu" style="background:url(img/${time.weather_icon_id}.png) no-repeat"></div>
                        <div class="zk">多云</div>
                        <div class="fen">${time.wind_direction}</div>
                        <div class="ji">${time.wind_level}</div>
                   </div>`;
            $(".everyday .ever_but").append(str);

        })
    }









})