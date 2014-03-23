threex.cubecamera
=============

threex.cubecamera is a three.js extension which provide an helper for cube cameras.
It is very usefull when a given object must reflect a texture cube live.
Be carefull, this require 6 rendering of the scene everytime you update it.
It becomes expensive fast.

Show Don't Tell
===============
* [examples/basic.html](http://jeromeetienne.github.io/threex.cubecamera/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.cubecamera/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.

How To Install It
=================

You can install it via script tag

```html
<script src='threex.cubecamera.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.cubecamera
```

How To Use It
=============

First you need to create a classic mesh, the one which gonna reflect the live texture cube.
In this example, we gonna create sphere with the color 'gold' like this.

```
var geometry	= new THREE.SphereGeometry(0.5, 32, 16)
var material	= new THREE.MeshPhongMaterial({
	color	: 'gold'
})
var mesh	= new THREE.Mesh(geometry, material)
scene.add( mesh )	
```

Now we needs to create the cube camera which gonna update the texture cube live.
We do that like this.

```
var cubeCamera	= new THREEx.CubeCamera(mesh)
scene.add(cubeCamera.object3d)
```

Don't forget to update it when needed (likely at every frame)

```
cubeCamera.update(renderer, scene)
```

Now that we got the textureCube, we set the mesh material to reflect this texture cube.

```
material.envMap	= cubeCamera.textureCube
```

This is it! Now you got the live texture cube on your sphere :)



