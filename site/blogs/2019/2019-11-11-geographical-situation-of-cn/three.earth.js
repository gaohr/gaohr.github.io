document.addEventListener('DOMContentLoaded', function () {
        threeStart();
    })

    // 渲染器
    var renderer;
    function initThree() {
        width = document.getElementById('canvas-frame').clientWidth;
        height = document.getElementById('canvas-frame').clientHeight;
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            canvas: renderer
        });
        renderer.setSize(width, height);
        document.getElementById('canvas-frame').appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 1.0);
    }

    // 相机
    var camera;
    function initCamera() {
        // 透视相机 视角越大，看到的场景越大，那么中间的物体相对于整个场景来说，就越小了
        camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
        camera.position.x = -100;
        camera.position.y = 500;
        camera.position.z = -500;
        camera.lookAt({ x: 0, y: 0, z: 0 });
    }

    // 场景
    var scene;
    function initScene() {
        scene = new THREE.Scene();
    }

    // 光源
    var light;
    function initLight() {

        // A light source positioned directly above the scene, with color fading from the sky color to the ground color. 
        // 位于场景正上方的光源，颜色从天空颜色渐变为地面颜色。
        //  var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
        // scene.add(light);

        // 环境光
        // light = new THREE.AmbientLight(0xFFFFFF);
        // light.position.set(100, 100, 200);
        // scene.add(light);

        // 平行光
        // 位置不同，方向光作用于物体的面也不同，看到的物体各个面的颜色也不一样
        light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, -1);
        scene.add(light);
    }

    // 地球
    var earthMesh;
    function initEarth() {
        var earthGeo = new THREE.SphereGeometry(200, 100, 100);
        var earthMater = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://jiangyuzhen.github.io/three-earth/assets/earth.jpg'),
            side: THREE.DoubleSide
        });
        earthMesh = new THREE.Mesh(earthGeo, earthMater);
        scene.add(earthMesh);
    }

    // 云
    var cloudsMesh;
    function initClouds() {
        var cloudsGeo = new THREE.SphereGeometry(205, 100, 100);
        var cloudsMater = new THREE.MeshPhongMaterial({
            alphaMap: new THREE.TextureLoader().load('https://jiangyuzhen.github.io/three-earth/assets/clouds.jpg'),
            transparent: true,
            opacity: 0.5
        });
        cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMater);
        scene.add(cloudsMesh);
    }

    var controls;
    function threeStart() {
        initThree();
        initCamera();
        initScene();
        initLight();
        initEarth();
        initClouds();
        // 载入控制器
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        renderer.clear();
        animate();
    }

    function animate() {
        controls.update();
        // 地球自转
        earthMesh.rotation.y -= 0.002;

        // 漂浮的云层
        cloudsMesh.rotation.y -= 0.005;
        cloudsMesh.rotation.z += 0.005;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }