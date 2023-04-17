import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";

export default function CustomObj() {
  // using ref to get bufferGeometry & create its normal
  const geometryRef = useRef();

  // without useEffect vertex normals will try compute on a geometry the not rendered yet
  // so we need useEffect to compute normals after first render
  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  const vertexCount = 20 * 3;

  // useMemo is like a cute little cache memory
  // can be used for optimization
  // want to store positions data in cache
  // because positions contains lots of vertex position data
  // every time state changes it will re-render
  // so its better not re-render it & store the positions in cache
  const positions = useMemo(() => {
    const positions = new Float32Array(vertexCount * 3);

    for (let i = 0; i < vertexCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  return (
    <mesh scale={[0.4, 0.4, 0.4]}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={vertexCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>
      <meshStandardMaterial color="red" side={THREE.DoubleSide} />
    </mesh>
  );
}
