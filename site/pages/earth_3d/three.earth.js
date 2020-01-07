document.addEventListener('DOMContentLoaded', function () {
        threeStart();
    })

    // 渲染器
    var renderer, stats;
    function initThree() {
        width = document.getElementById('canvas-frame').clientWidth;
        height = document.getElementById('canvas-frame').clientHeight;
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            canvas: renderer
        });
        renderer.setSize(width, height);
        cv = document.getElementById('canvas-frame');
		cv.appendChild(renderer.domElement);
        renderer.setClearColor(0x000000, 1.0);
		// performance monitor
		stats = new Stats();
		cv.appendChild(stats.dom);
    }

    // 相机
    var camera;
    function initCamera() {
        // 透视相机 视角越大，看到的场景越大
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

    // 太阳与光源
    var sunMesh;
    function initSun() {
		bulbLight = new THREE.PointLight(0xffffff);
		bulbLight.position.set(3000, 3000, -3000);
		bulbLight.castShadow = true;
		scene.add(bulbLight);
		
		var sunGeo = new THREE.SphereGeometry(100, 100, 100);
        var sunMater = new THREE.MeshBasicMaterial({
			map: THREE.ImageUtils.loadTexture('https://raw.githubusercontent.com/gaohr/gaohr.github.io/master/site/pages/earth_3d/sun.jpg')
		});
		sunMesh = new THREE.Mesh(sunGeo, sunMater);
		sunMesh.position.set(3000, 3000, -3000);
		scene.add(sunMesh);
    }
	
    // 地球
    var earthMesh;
    function initEarth() {
        var earthGeo = new THREE.SphereGeometry(200, 100, 100);
        var earthMater = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('http://gaohr.win/site/blogs/2019/2019-11-11-geographical-situation-of-cn/imgs/earth.jpg'),
            side: THREE.DoubleSide
        });
        earthMesh = new THREE.Mesh(earthGeo, earthMater);
        scene.add(earthMesh);
    }
	
    // 月球
    var moonMesh;
    function initMoon() {
        var moonGeo = new THREE.SphereGeometry(20, 100, 100);
        var moonMater = new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('https://raw.githubusercontent.com/gaohr/gaohr.github.io/master/site/pages/earth_3d/moon.jpg'),
            side: THREE.DoubleSide
        });
        moonMesh = new THREE.Mesh(moonGeo, moonMater);
		moonMesh.position.set(240, 100, 100);
        scene.add(moonMesh);
    }


    // 云
    var cloudsMesh;
    function initClouds() {
        var cloudsGeo = new THREE.SphereGeometry(205, 100, 100);
        var cloudsMater = new THREE.MeshPhongMaterial({
            alphaMap: new THREE.TextureLoader().load('http://gaohr.win/site/blogs/2019/2019-11-11-geographical-situation-of-cn/imgs/clouds.jpg'),
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
        initSun();
        initEarth();
        initMoon();
        initClouds();
        // 载入控制器
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        renderer.clear();
        animate();
    }
			
    function animate() {
        controls.update();
        // 地球自转
        earthMesh.rotation.y += 0.002;

        // 云层漂浮效果
        cloudsMesh.rotation.y -= 0.005;
        cloudsMesh.rotation.z += 0.005;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
		stats.update();
    }
	
	
	
	
	
	
	
	
	
	
	
	