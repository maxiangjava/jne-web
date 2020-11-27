<template>
  <div style="position: absolute;margin: 50px">
    <div style="display: flex;width: 720px;margin-left: 100px;text-align: center;height: 20px;height: 20px">
      <div v-for="index in 12" :key="index" style="flex: 1">{{index * 2}}</div>
    </div>
    <div class="mx-week">
      <div class="mx-week-title">
        <div class="mx-week-num">星期一</div>
        <div class="mx-week-num">星期二</div>
        <div class="mx-week-num">星期三</div>
        <div class="mx-week-num">星期四</div>
        <div class="mx-week-num">星期五</div>
        <div class="mx-week-num">星期六</div>
        <div class="mx-week-num">星期日</div>
      </div>
      <div v-for="item in 12" :key="item" class="mx-week-calibration"></div>
    </div>

    <div class="mx-time">
      <div class="mx-time-row">
        <div @mousedown="down($event,1)" @mousemove="move($event,'mon',1)" @mouseup="up" class="mx-time-row-select" ref="mon"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,2)" @mousemove="move($event,'tues',2)" @mouseup="up" class="mx-time-row-select" ref="tues"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,3)" @mousemove="move($event,'wed',3)" @mouseup="up" class="mx-time-row-select" ref="wed"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,4)" @mousemove="move($event,'thur',4)" @mouseup="up" class="mx-time-row-select" ref="thur"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,5)" @mousemove="move($event,'fri',5)" @mouseup="up" class="mx-time-row-select" ref="fri"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,6)" @mousemove="move($event,'sat',6)" @mouseup="up" class="mx-time-row-select" ref="sat"></div>
      </div>
      <div class="mx-time-row">
        <div @mousedown="down($event,7)" @mousemove="move($event,'sun',7)" @mouseup="up" class="mx-time-row-select" ref="sun"></div>
      </div>
    </div>

    <div>
      <div :style="styleA" v-show="startShow">
        <div style="background-color:#e57c7c;width: 50px;height: 30px;line-height: 30px;text-align: center;border-radius: 5px">
          {{ startTime }}</div>
        <div style="width: 1px;height: 1px;border-width: 5px;border-style: solid;border-color: #e57c7c transparent transparent transparent;margin-left: 20px"></div>
      </div>
      <div :style="styleB" v-show="endShow">
        <div style="background-color:#e57c7c;width: 50px;height: 30px;line-height: 30px;text-align: center;border-radius: 5px">
          {{ endTime }}</div>
        <div style="width: 1px;height: 1px;border-width: 5px;border-style: solid;border-color: #e57c7c transparent transparent transparent;margin-left: 20px"></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Test",
    data(){
      return{
        startX:0,
        startY:0,
        endX:0,
        endY:0,
        lastX:0,
        difference:0,
        flag:false,
        foo:false,
        startShow:false,
        endShow:false,
        div:'',
        styleA:'',
        styleB:'',
        startTime:0,
        endTime:0
      }
    },
    methods:{
      down(event,num){
        console.log(event,num)
        this.startX = event.clientX
        this.difference = event.clientX - event.offsetX
        this.lastX = this.startX
        this.flag = true
        this.div = document.createElement('div');
        this.div.style.backgroundColor = 'blue'
        this.div.style.position = 'absolute';
        this.div.style.zIndex = 3;
        this.div.style.height = '20px';
        this.div.style.marginTop = '5px';
        this.foo = true
        let h = parseInt(this.startX / 30);
        let m = (this.startX % 30) * 2;
        if(m > 9){
          this.startTime = h + ':' + m
        }else{
          this.startTime = h + ':0' + m
        }
        this.styleA = {position: 'absolute',zIndex: 9,left:this.startX-this.difference+44 +'px',top:(num*30)-41 + 'px'}
      },
      move(event,ref,num){
        this.endX = event.clientX
        // console.log('现在坐标：' + this.endX,'最开始坐标：'+this.startX)
        // console.log(event)
        console.log('坐标差值' + Math.abs(this.endX - this.lastX))
        if(this.flag && Math.abs(this.endX - this.lastX) < 50){
          this.lastX = this.endX
          let left = 0;
          let width = 0;

          if(this.endX > this.startX){
            left = this.startX
            width = this.endX - this.startX
            console.log(width)
          }
          if(this.endX < this.startX){
            left = this.endX
            width = this.startX - this.endX
          }
          this.div.style.left = left -this.difference + 'px'
          this.div.style.width = width + 'px'
          if(this.foo && width > 5){
            this.foo = false
            this.startShow = true
            this.endShow = true
            this.$refs[ref].appendChild(this.div)
          }

          let h = parseInt(this.endX / 30);
          let m = (this.endX % 30) * 2;
          if(m > 9){
            this.endTime = h + ':' + m
          }else{
            this.endTime = h + ':0' + m
          }
          this.styleB = {position: 'absolute',zIndex: 9,left:this.endX-this.difference+44+'px',top:(num*30)-41 + 'px'}
        }
      },
      up(){
        this.flag = false
      }
    }
  }

</script>

<style lang="scss" scoped>

.mx-week{
  height: 210px;
  width: 780px;
  margin-left: 10px;
  display: flex;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  .mx-week-title{
    border-left: 1px solid gray;
    border-right: 1px solid gray;
    width: 60px;
    text-align: center;
    .mx-week-num{
      height: 30px;
      line-height: 30px;
    }
  }
  .mx-week-calibration{
    border-right: 1px solid gray;
    width: 60px;
  }
}
.mx-time{
  position: absolute;
  z-index: 1;
  left: 10px;
  top: 20px;
  .mx-time-row{
    height: 30px;
    width: 780px;
    .mx-time-row-select{
      position: absolute;
      height: 30px;
      width: 720px;
      margin-left: 60px;
      cursor:pointer
    }
  }
  .mx-time-row:hover{
    background: rgba(188, 168, 168, 0.3)
  }
}

</style>