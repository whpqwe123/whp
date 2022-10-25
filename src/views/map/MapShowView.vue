<script>
export default {
    data() {
        return {
            map: null,
            searchStr: ''
        }
    },
    methods: {
        searchClick(){
            this.search(this.searchStr)
        },
        search(str){

            var options = {
                onSearchComplete: function(results){
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS){
                        var s = [];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++){
                            s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                        }
                        document.getElementById("r-result").innerHTML = s.join("<br/>");
                    }
                }
            };
            var local = new BMapGL.LocalSearch(this.map, options);
            local.search(str);
        }
    },
    mounted(){
        this.map = new BMapGL.Map("container");          // 创建地图实例 
        var point = new BMapGL.Point(116.404, 39.915);  // 创建点坐标 
        this.map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别


        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        // this.map.setMapType(BMAP_EARTH_MAP);      // 设置地图类型为地球模式


        var scaleCtrl = new BMapGL.ScaleControl();  // 添加比例尺控件
        this.map.addControl(scaleCtrl);
        var zoomCtrl = new BMapGL.ZoomControl();  // 添加缩放控件
        this.map.addControl(zoomCtrl);
        var cityCtrl = new BMapGL.CityListControl();  // 添加城市列表控件
        this.map.addControl(cityCtrl);

        // 配置个性化地图
        // this.map.setMapStyleV2({     
        //     styleId: '5ff91607988bcecef6d8d734fd2de06e'
        // });


        // var point = new BMapGL.Point(116.404, 39.915);   
        // var marker = new BMapGL.Marker(point);        // 创建标注   
        // this.map.addOverlay(marker);                     // 将标注添加到地图中

        const _this = this

        // 浏览器定位
        var geolocation = new BMapGL.Geolocation();
        geolocation.getCurrentPosition(function(r){
            var point = new BMapGL.Point(r.point.lng, r.point.lat);   
            var marker = new BMapGL.Marker(point);        // 创建标注   
            _this.map.addOverlay(marker);                     // 将标注添加到地图中
            _this.map.panTo(r.point); // 定位成功后跳转到当前定位位置



            // 检索附件景点
            // _this.map.centerAndZoom(new BMapGL.Point(r.point.lng, r.point.lat), 11);
            // var local = new BMapGL.LocalSearch(_this.map, {
            //     renderOptions:{map: _this.map}
            // });
            // local.search("景点");


            

      
        });

        


    }
}
</script>
<template>
    <h1>
        地图显示 <input type="text" v-model="searchStr"> <button @click="searchClick"> 搜索 </button>
    </h1>
    <div id="container"></div>
    <div id="r-result"></div>
</template>
<style lang="scss" scoped>
#container {
    height: 400px;
}
</style>