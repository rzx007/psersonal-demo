import './style.css'
import * as THREE from 'three'
import Cube, { Model } from './cube'

class App {
  // 渲染器
  renderer: THREE.WebGL1Renderer = new THREE.WebGL1Renderer({ antialias: true })

  // 渲染器设置
  rendererSetting = (dom = document.querySelector('#app')) => {
    // 设置渲染器像素值大小
    this.renderer.setPixelRatio(window.devicePixelRatio)

    // 渲染尺寸
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // 挂在渲染器
    dom?.appendChild(this.renderer.domElement)

    // 设置相机位置
    this.camera.position.z = 5

    window.addEventListener('resize', () => {
      // 重置比例
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      // 重置相机比例
      this.camera.aspect = window.innerWidth / window.innerHeight
      // 更新Matrix
      this.camera.updateProjectionMatrix()
    })
  }
  // 创建场景
  scene: THREE.Scene = new THREE.Scene()

  // 创建摄像头
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  // 动画
  animate = () => {
    requestAnimationFrame(this.animate)
    this.render()
  }

  // 渲染(调用时，渲染一帧)
  render = () => {
    this.renderer.render(this.scene, this.camera)
    this.modelAnimate()
  }

  // 模型动画
  modelAnimate = () => {
    this.modelList.forEach((model) => {
      model.animate()
    })
  }
  // 添加网络模型
  modelList: Array<Model> = []

  addModel(mesh: Model) {
    this.scene.add(mesh.model)
    this.modelList.push(mesh)
  }
  private addModelList(models: Array<Model> | Model | undefined) {
    if (Array.isArray(models)) {
      models.forEach((model) => {
        this.addModel(model)
      })
    } else if (models) {
      this.addModel(models as Model)
    }
  }
  static app: App

  constructor(modelList?: Array<Model> | Model) {
    // 实例化一次
    if (App.app) return
    App.app = this

    this.rendererSetting()
    this.animate()
    this.addModelList(modelList)
  }
}

// 实例化
const app = new App()
// 设置相机位置


const cube: Model = new Cube()

app.addModel(cube)

// 或者
/**
 * const app = new App(new Cube())
 * app.camera.position.z = 5
 */
