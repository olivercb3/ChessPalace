// Create temple
const temple = new Entity()
temple.addComponent(new GLTFShape('models/Temple.glb'))
temple.addComponent(new Transform({
    position: new Vector3(16, 0, 16)
}))

// Add temple to engine
engine.addEntity(temple)

// Create Gnark
let gnark = new Entity()
gnark.addComponent(new GLTFShape('models/gnark.gltf'))
gnark.addComponent(new Transform({
    position: new Vector3(8, 0, 8)
}))

// Add Gnark to engine
engine.addEntity(gnark)