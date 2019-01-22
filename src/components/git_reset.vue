<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <h2>{{random}}</h2> 
    <button @click="random = randomNum(min, max)">生成随机数</button>
    <!-- <input type="number" v-model="min">
    <input type="number" v-model="max">
    <button @click="asyncFun">异步循环</button> -->
    <p>git reset 单个文件练习</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      random: '',
      min: null,
      max: null
    }
  },
  created () {

  },
  methods:{
      asyncFun () {
        for (let i = 0; i < 10; i++) {
          setTimeout(() => {
            console.log(i)
          }, this.randomNum(3, 10) * 100)
        }
      },
      randomNum (minNum, maxNum) {
          if (minNum) {
            minNum = Number(minNum)
          }
          if (maxNum) {
            maxNum = Number(maxNum)
          }
          switch(arguments.length) {
            case 1:
            console.log(1)
              return parseInt(Math.random() * (minNum + 1), 10)
            // break;
            case 2:
            console.log(2, minNum, maxNum)
              return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
            // break
            default:
            console.log(0)
              return 0
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
