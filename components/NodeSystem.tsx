'use client';
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import NodeComponent from './NodeComponent';

type Node = {
  id: number;
  position: THREE.Vector3;
  connections: number[];
};

const NodeSystem: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, position: new THREE.Vector3(-2, 0, 0), connections: [2] },
    { id: 2, position: new THREE.Vector3(2, 0, 0), connections: [1] },
  ]);

  const handleUpdateNode = (id: number, position: THREE.Vector3) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => (node.id === id ? { ...node, position } : node))
    );
  };

  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {nodes.map((node) => (
        <NodeComponent key={node.id} node={node} onUpdate={handleUpdateNode} />
      ))}
      {nodes.map((node) =>
        node.connections.map((connectionId) => {
          const connectedNode = nodes.find((n) => n.id === connectionId);
          if (!connectedNode) return null;
          const points = [node.position, connectedNode.position];
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          return (
            <line key={`${node.id}-${connectionId}`}>
              <lineBasicMaterial attach="material" color="black" />
              <primitive object={lineGeometry} attach="geometry" />
            </line>
          );
        })
      )}
    </Canvas>
  );
};

export default NodeSystem;
