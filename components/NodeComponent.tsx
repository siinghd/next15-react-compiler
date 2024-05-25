'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type NodeProps = {
  node: Node;
  onUpdate: (id: number, position: THREE.Vector3) => void;
};

type Node = {
  id: number;
  position: THREE.Vector3;
  connections: number[];
};

const NodeComponent: React.FC<NodeProps> = ({ node, onUpdate }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(new THREE.Vector3());

  useFrame(({ mouse, camera, raycaster }: any) => {
    if (isDragging && meshRef.current) {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([meshRef.current]);
      if (intersects.length > 0) {
        const newPosition = intersects[0].point.clone().sub(offset);
        onUpdate(node.id, newPosition);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      onPointerDown={(event) => {
        setIsDragging(true);
        const offset = new THREE.Vector3().subVectors(
          new THREE.Vector3(event.point.x, event.point.y, event.point.z),
          node.position
        );
        setOffset(offset);
      }}
      onPointerUp={() => setIsDragging(false)}
    >
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default NodeComponent;
