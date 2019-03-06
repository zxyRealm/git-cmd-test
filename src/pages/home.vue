<template>
    <div class="page">
        <!--<iframe scrolling="no" class="three__iframe" src="/public/html/shadow.html" border="0" frameborder="0"></iframe>-->
        <canvas id="gl_canvas"></canvas>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        gl: '',
        shaderProgram: '',
        vertexBuffer: '',
        canvas: ''
      }
    },
    components: {},
    methods: {
      // 创建WebGL上下文
      createGLContext (canvas) {
        let names = ['webgl', 'experimental-webgl']
        let context = null
        for (let i = 0; i < names.length; i++) {
          try {
            context = canvas.getContext(names[i], {antialias: true})
          } catch (e) {
            console.error(e)
            // create WebGL context error info
          }
          if (context) break
        }
        if (context) {
          context.viewportWidth = canvas.width
          context.viewportHeight = canvas.height
        } else {
          alert('Failed to create WebGL Context')
        }
        return context
      },
      /* 编译着色器
      * @param type {Object} shader type
      * @param shaderSource {string}
      * */
      loadShader (type, shaderSource) {
        // 创建一个着色器对象
        let shader = this.gl.createShader(type)
        // 将源代码载入到着色器中
        this.gl.shaderSource(shader, shaderSource)
        // 编译着色器
        this.gl.compileShader(shader)

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
          alert('Error compiling shader' + this.gl.getShaderInfoLog(shader))
          this.gl.deleteShader(shader)
          return null
        }
        return shader
      },
      // 创建程序对象和链接着色器
      setupShader () {
        let vertexShaderSource =
          'attribute vec3 aVertexPosition;                 \n' +
          'void main() {                                   \n' +
          '  gl_Position = vec4(aVertexPosition, 1.0);     \n' +
          '}'
        let fragmentShaderSource =
          'precision mediump float;                    \n' +
          'void main() {                               \n' +
          '  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);  \n' +
          '}                                           \n'

        let vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexShaderSource)
        let fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
        // 创建一个程序对象
        this.shaderProgram = this.gl.createProgram()
        // 把编译好的着色器插入到程序对象中
        this.gl.attachShader(this.shaderProgram, vertexShader)
        this.gl.attachShader(this.shaderProgram, fragmentShader)
        // 执行链接操作
        this.gl.linkProgram(this.shaderProgram)

        if (!this.gl.getProgramParameter(this.shaderProgram, this.gl.LINK_STATUS)) {
          alert('Failed to setup shaders')
        }
        // 链接成功可得到一个程序对象, 告知WebGL 引擎可以用这个程序对象绘制图形
        this.gl.useProgram(this.shaderProgram)
        /* 在顶点着色器中必须知道每一个属性对应的通用属性索引，因为在绘制过程中，
        * 就是利用这个索引把包含顶点数据的缓冲和顶点着色器中的属性建立起正确的关联。
        * 获取索引有两种策略：
        * 1. 用gl.bindAttribLocation()方法定义在执行链接之前把属性绑定到哪个索引上。
        *    定义了这个索引后，就可以在绘制过程中使用这个索引
        * 2. 由WebGL引擎自己决定某个属性要使用哪个索引。在链接完成后，
        *    用gl.getAttribLocation()方法获得某个属性的通用属性索引
        * */
        this.$set(this.shaderProgram, 'vertexPositionAttribute', this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'))
      },
      // 建立缓冲
      setupBuffers () {
        // 创建一个WebGLBuffer对象
        this.vertexBuffer = this.gl.createBuffer()
        // 绑定为当前的数组缓冲对象， 即这个缓冲对象就是WebGL使用的对象
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
        let triangleVertices = [
          0.0, 0.5, 0.0,
          -0.5, -0.5, 0.0,
          0.5, -0.5, 0.0
        ]
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(triangleVertices), this.gl.STATIC_DRAW)
        // 定义这个缓冲中的项或者顶点个数
        this.$set(this.vertexBuffer, 'numberOfItems', 3)
        // 定义每个属性有多少个分量
        this.$set(this.vertexBuffer, 'itemSize', 3)
      },
      // 绘制场景
      draw () {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)

        this.gl.vertexAttribPointer(this.shaderProgram.vertexPositionAttribute,
          this.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0)

        this.gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute)

        this.gl.drawArrays(this.gl.TRIANGLES, 0, this.vertexBuffer.numberOfItems)
      },
      startup () {
        this.gl = this.createGLContext(document.getElementById('gl_canvas'))
        this.setupShader()
        this.setupBuffers()
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.draw()
      }
    },
    mounted () {
      this.startup()
    }
  }
</script>

<style lang="scss" scoped>
    .three__iframe {
        width: 80%;
        height: 600px;
        margin: 0 auto;
    }

    .page canvas {
        width: 600px;
        height: 400px;
    }
</style>
