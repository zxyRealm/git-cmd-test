<template>
    <div class="page">
        <iframe scrolling="no" class="three__iframe" src="/public/html/shadow.html" border="0" frameborder="0"></iframe>
        <!--<canvas id="gl_canvas" width="600" height="400"></canvas>-->
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
        let names = ['webgl2', 'experimental-webgl2', 'webgl', 'experimental-webgl']
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
          'attribute vec3 aVertexPosition;                  ' +
          // 'attribute vec4 aVertexColor;                     ' +
          // 'uniform mat4 uMVMatrix;                          ' +
          // 'uniform mat4 uPMatrix;                           ' +
          // 'varying vec4 vColor;                             ' +
          'void main() {                                    ' +
          '  gl_Position = vec4(aVertexPosition, 1.0);' +
          // '  vColor = aVertexColor;                         ' +
          '}'
        let fragmentShaderSource =
          'precision mediump float;                         ' +
          // 'uniform vec2 u_resolution;\n' +
          // 'uniform vec2 u_mouse;\n' +
          // 'uniform float u_time;\n' +
          //
          // 'float cubicPulse( float c, float w, float x ){\n' +
          // '    x = abs(x - c);\n' +
          // '    if( x>w ) return 0.0;\n' +
          // '    x /= w;\n' +
          // '    return 1.0 - x*x*(3.0-2.0*x);\n' +
          // '}' +
          // 'float plot(vec2 st, float pct){\n' +
          // '  return  smoothstep( pct-0.02, pct, st.y) -\n' +
          // '          smoothstep( pct, pct+0.02, st.y);\n' +
          // '}' +
          // 'void main() {\n' +
          // '    vec2 st = gl_FragCoord.xy/u_resolution;\n' +
          //
          // '    float y = cubicPulse(0.5,0.2,st.x);\n' +
          //
          // '    vec3 color = vec3(y);\n' +
          //
          // '    float pct = plot(st,y);\n' +
          // '    color = (1.0-pct)*color+pct*vec3(0.0,1.0,1.0);\n' +
          //
          // '    gl_FragColor = vec4(color,1.0);\n' +
          // '}'
        // 'varying vec4 vColor;                             ' +
        'uniform float u_time;                            ' +
        'void main() {                                    ' +
        '  gl_FragColor = vec4(sin(u_time), 0.0, 1.0, 1.0);' +
        '}'

        let vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vertexShaderSource)
        let fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fragmentShaderSource)
        // 创建一个程序对象
        this.shaderProgram = this.gl.createProgram()
        // 把编译好的着色器插入到程序对象中
        console.log(fragmentShader)
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
        this.$set(this.shaderProgram, 'vertexPosition', this.gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'))
        this.$set(this.shaderProgram, 'vertexColor', this.gl.getAttribLocation(this.shaderProgram, 'aVertexColor'))
      },
      // 建立缓冲
      setupBuffers () {
        // 创建一个WebGLBuffer对象
        this.vertexBuffer = this.gl.createBuffer()
        // 绑定为当前的数组缓冲对象， 即这个缓冲对象就是WebGL使用的对象
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer)
        let triangleVertices = new Float32Array([
          -0.5, 0.5,
          0.5, 0.5,
          0.0, 0.0,
          0.5, -0.5,
          -0.5, -0.5,
          -0.5, 0.5
        ])
        this.gl.bufferData(this.gl.ARRAY_BUFFER, triangleVertices, this.gl.STATIC_DRAW)
        // 定义这个缓冲中的项或者顶点个数
        this.$set(this.vertexBuffer, 'numberOfItems', 6)
        // 定义每个属性有多少个分量
        this.$set(this.vertexBuffer, 'itemSize', 2)
        this.$set(this.vertexBuffer, 'bitSize', triangleVertices.BYTES_PER_ELEMENT)
      },
      // 绘制场景
      draw () {
        this.gl.viewport(0, 0, this.gl.viewportWidth, this.gl.viewportHeight)
        // 指定颜色缓冲
        /* 缓冲类型
        * gl.COLOR_BUFFER_BIT   指定颜色缓冲区
        * gl.DEPTH_BUFFER_BIT   指定深度缓冲区
        * gl.STENCIL_BUFFER_BIT 指定模板缓冲区
        * */
        this.gl.clear(this.gl.COLOR_BUFFER_BIT)
        // let size = this.vertexBuffer.bitSize

        this.gl.vertexAttribPointer(this.shaderProgram.vertexPosition,
          this.vertexBuffer.itemSize, this.gl.FLOAT, false, 0, 0)
        this.gl.enableVertexAttribArray(this.shaderProgram.vertexPosition)

        // this.gl.vertexAttribPointer(this.shaderProgram.vertexColor,
        //   3, this.gl.FLOAT, false, size * 5, size * 2)
        // this.gl.enableVertexAttribArray(this.shaderProgram.vertexColor)

        /* 根据启用的WebGLBuffer 对象中的数据，绘制由第一个参数定义的图元
        * @params mode 渲染图元类型
        *   gl.POINTS: Draws a single dot.
            gl.LINE_STRIP: 将所有的点用直线依次连接。
            gl.LINE_LOOP: 将所有的点用直线依次连接，并连接首尾顶点。
            gl.LINES: 将一对顶点用直线连接.
            gl.TRIANGLE_STRIP：
            gl.TRIANGLE_FAN：
            gl.TRIANGLES: Draws a triangle for a group of three vertices.
        * @params first 顶点数据中的哪一个索引作为第一个索引
        * @params count 需要使用的顶点数
        * */
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, this.vertexBuffer.numberOfItems)
      },
      startup () {
        this.gl = this.createGLContext(document.getElementById('gl_canvas'))

        this.setupShader()
        this.setupBuffers()
        // 使用指定背景色清空绘图区
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0)
        this.draw()
      }
    },
    mounted () {
      // this.startup()
    }
  }
</script>

<style lang="scss" scoped>
    .three__iframe {
        width: 80%;
        height: 600px;
        margin: 0 auto;
    }

</style>
