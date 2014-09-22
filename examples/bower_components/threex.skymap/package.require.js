define( [ 'module'
	, './threex.skymap',
	, './threex.texturecube'
	, './threex.cubetexturehcross'
	], function(module){
	// set baseUrl for this plugin
	THREEx.TextureCube.baseUrl	= module.uri+'/../';
	// reinit wellKnownUrls
	THREEx.TextureCube.initWellKnownUrls(THREEx.TextureCube.baseUrl)
});