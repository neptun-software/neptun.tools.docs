import React, { useState, useEffect, useCallback, useRef } from 'react';
import styles from './styles.module.css';

export default function ZoomableImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const [hasMoved, setHasMoved] = useState(false);
  const frameRef = useRef();
  const imageRef = useRef(null);

  const imageSrc = src;

  const updateTransform = useCallback(() => {
    if (imageRef.current) {
      const transform = `translate3d(calc(-50% + ${positionRef.current.x}px), calc(-50% + ${positionRef.current.y}px), 0) scale(${scale})`;
      imageRef.current.style.transform = transform;
    }
  }, [scale]);

  const handleZoom = useCallback((delta) => {
    setScale(prevScale => {
      const newScale = prevScale + delta * 0.1;
      return Math.min(Math.max(0.5, newScale), 3);
    });
  }, []);

  useEffect(() => {
    updateTransform();
  }, [scale, updateTransform]);

  const handleWheel = useCallback((e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      handleZoom(delta);
    }
  }, [handleZoom]);

  const updatePosition = useCallback(() => {
    if (isDraggingRef.current) {
      updateTransform();
      frameRef.current = requestAnimationFrame(updatePosition);
    }
  }, [updateTransform]);

  const handleMouseDown = useCallback((e) => {
    if (isZoomed) {
      e.preventDefault();
      isDraggingRef.current = true;
      setHasMoved(false);
      dragStartRef.current = {
        x: e.clientX - positionRef.current.x,
        y: e.clientY - positionRef.current.y
      };
      frameRef.current = requestAnimationFrame(updatePosition);
    }
  }, [isZoomed, updatePosition]);

  const handleMouseMove = useCallback((e) => {
    if (isDraggingRef.current) {
      e.preventDefault();
      setHasMoved(true);
      positionRef.current = {
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y
      };
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
  }, []);

  const handleClick = useCallback(() => {
    if (!hasMoved) {
      setIsZoomed(!isZoomed);
      setScale(1);
      positionRef.current = { x: 0, y: 0 };
      if (imageRef.current) {
        imageRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
      }
    }
  }, [hasMoved, isZoomed]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setScale(1);
    positionRef.current = { x: 0, y: 0 };
    setHasMoved(false);
    if (imageRef.current) {
      imageRef.current.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
    }
  }, []);

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isZoomed, handleWheel, handleMouseMove, handleMouseUp]);

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageWrapper} onClick={handleClick}>
        <img
          src={imageSrc}
          alt={alt}
          draggable={false}
        />
      </div>
      {isZoomed && (
        <div className={styles.lightbox} onClick={handleClick}>
          <button className={styles.closeButton} onClick={handleClose}>×</button>
          <img
            ref={imageRef}
            src={imageSrc}
            alt={alt}
            style={{
              transform: 'translate3d(-50%, -50%, 0) scale(1)',
              willChange: 'transform'
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
          <div className={styles.zoomControls}>
            <button onClick={(e) => { e.stopPropagation(); handleZoom(1); }}>+</button>
            <button onClick={(e) => { e.stopPropagation(); handleZoom(-1); }}>−</button>
          </div>
        </div>
      )}
    </div>
  );
}
