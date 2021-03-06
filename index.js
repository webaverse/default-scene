import * as THREE from 'three';
// import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import metaversefile from 'metaversefile';
const {useApp, useLocalPlayer, useInternals, useGeometries, useMaterials, useFrame, useActivate, useLoaders, usePhysics, useCleanup} = metaversefile;

// const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

const localVector = new THREE.Vector3();
const localVector2 = new THREE.Vector3();
const localVector2D = new THREE.Vector2();
// const localBox = new THREE.Box3();
const localLine = new THREE.Line3();
const localMatrix = new THREE.Matrix4();

export default e => {
  const app = useApp();
  const physics = usePhysics();
  // const {CapsuleGeometry} = useGeometries();
  // const {WebaverseShaderMaterial} = useMaterials();

  const physicsIds = [];

  let subApps = [];

  e.waitUntil((async () => {
    await Promise.all([
      (async () => {
        const filter = await metaversefile.createApp({
          start_url: './metaverse_modules/filter/',
        });
        app.add(filter);
        subApps.push(filter);
      })(),
      (async () => {
        const barrier = await metaversefile.createApp({
          start_url: './metaverse_modules/barrier/',
        });
        app.add(barrier);
        subApps.push(barrier);
      })(),
      (async () => {
        const infinistreet = await metaversefile.createApp({
          start_url: './metaverse_modules/infinistreet/',
        });
        app.add(infinistreet);
        subApps.push(infinistreet);
      })(),
    ]);
  })());

  useFrame(() => {
    /* for (const subApp of subApps) {
      
    } */
  });
  
  useCleanup(() => {
    for (const physicsId of physicsIds) {
      physics.removeGeometry(physicsId);
    }
  });

  return app;
};