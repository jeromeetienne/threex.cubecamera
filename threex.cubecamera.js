var THREEx	= THREEx || {};

THREEx.CubeCamera	= function(object3d, textureW){
	// handle parameter default
	textureW	= textureW || 1024;

	// create the camera
	var camera	= new THREE.CubeCamera( 0.001, 1000, textureW );
	camera.position	= object3d.position
	this.camera	= camera

	// TODO not sure how usefull are those
	this.object3d	= camera
	this.textureCube= camera.renderTarget

	// to avoid flickering on the border of the sphere
	camera.renderTarget.minFilter = THREE.LinearMipMapLinearFilter;
	
	// update function
	this.update	= function(renderer, scene){
		// TODO what if object3d contains children
		// console.assert(object3d.children.length === 0)
		object3d.visible	= false;	// *cough*

		// var position	= object3d.position.clone()

		// // TODO compute position as world position
		// camera.position.copy(position)
		camera.updateCubeMap(renderer, scene)

		object3d.visible	= true;		// *cough*			
	}
}

THREEx.CubeCamera.toImages	= function(cubeCamera, renderer, textureW){
	console.assert( cubeCamera instanceof THREE.CubeCamera )

	textureW	= textureW	|| cubeCamera.renderTarget.width

	// init scene
	var sceneRTT	= new THREE.Scene();

	// init skybox to screenshot 
	var shader	= THREE.ShaderLib['cube']
	var uniforms	= THREE.UniformsUtils.clone(shader.uniforms)
	var material = new THREE.ShaderMaterial({
		fragmentShader	: shader.fragmentShader,
		vertexShader	: shader.vertexShader,
		uniforms	: uniforms,
		depthWrite	: false,
		side		: THREE.BackSide
	})
	// set the cubeCamera.renderTarget
	uniforms[ "tCube" ].value	= cubeCamera.renderTarget;

	// init geometry
	var geometry	= new THREE.BoxGeometry(500, 500, 500)
	var mesh	= new THREE.Mesh(geometry, material);
	sceneRTT.add(mesh)

	// backup renderer parameters
	var old	= {
		width		: renderer.domElement.width,
		height		: renderer.domElement.height,
		devicePixelRatio: renderer.devicePixelRatio,
	}
	// set new renderer parameters
	renderer.setSize( textureW, textureW );
	renderer.devicePixelRatio	= 1

	var images	= []
	cubeCamera.children.slice().forEach(function(subCamera){
		// render sceneRtt with subCamera
		renderer.render(sceneRTT, subCamera)

		// clone renderer.domElement
		var canvas	= document.createElement('canvas')
		canvas.width	= renderer.domElement.width
		canvas.height	= renderer.domElement.height
		var context	= canvas.getContext('2d')
		// mirror in y axis - im not sure why it is needed
		context.translate(0, canvas.height);
		context.scale(1,-1)
		// draw the image in the cloned canvas
		context.drawImage(renderer.domElement, 0, 0)

		// store cloned canvas
		images.push(canvas)
	})

	// restore renderer parameters
	renderer.devicePixelRatio	= old.devicePixelRatio
	renderer.setSize(old.width, old.height );

	// return the just-built image
	return images
}
