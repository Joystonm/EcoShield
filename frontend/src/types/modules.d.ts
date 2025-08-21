// Type declarations for modules

declare module 'animejs' {
  interface AnimeInstance {
    play(): void;
    pause(): void;
    restart(): void;
    reverse(): void;
    seek(time: number): void;
    remove(targets: any): void;
  }

  interface AnimeParams {
    targets?: any;
    duration?: number;
    delay?: number | ((el: any, i: number) => number);
    endDelay?: number;
    easing?: string;
    round?: number;
    direction?: 'normal' | 'reverse' | 'alternate';
    loop?: boolean | number;
    autoplay?: boolean;
    update?: (anim: AnimeInstance) => void;
    complete?: (anim: AnimeInstance) => void;
    [key: string]: any;
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance;
    stagger: (value: number, options?: any) => (el: any, i: number) => number;
    remove: (targets: any) => void;
    timeline: (params?: any) => any;
  }

  const anime: AnimeStatic;
  export default anime;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, EventDispatcher, MOUSE, TOUCH, Vector3 } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);
    
    object: Camera;
    domElement: HTMLElement | Document;
    
    enabled: boolean;
    target: Vector3;
    
    minDistance: number;
    maxDistance: number;
    
    minZoom: number;
    maxZoom: number;
    
    minPolarAngle: number;
    maxPolarAngle: number;
    
    minAzimuthAngle: number;
    maxAzimuthAngle: number;
    
    enableDamping: boolean;
    dampingFactor: number;
    
    enableZoom: boolean;
    zoomSpeed: number;
    
    enableRotate: boolean;
    rotateSpeed: number;
    
    enablePan: boolean;
    panSpeed: number;
    screenSpacePanning: boolean;
    keyPanSpeed: number;
    
    autoRotate: boolean;
    autoRotateSpeed: number;
    
    keys: {
      LEFT: string;
      UP: string;
      RIGHT: string;
      BOTTOM: string;
    };
    
    mouseButtons: {
      LEFT: MOUSE;
      MIDDLE: MOUSE;
      RIGHT: MOUSE;
    };
    
    touches: {
      ONE: TOUCH;
      TWO: TOUCH;
    };
    
    update(): boolean;
    saveState(): void;
    reset(): void;
    dispose(): void;
    
    getPolarAngle(): number;
    getAzimuthalAngle(): number;
    getDistance(): number;
  }
}
