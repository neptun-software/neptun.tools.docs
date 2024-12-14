import React, { useState, useEffect, useCallback } from 'react';
import styles from './styles.module.css';

export default function ZoomableImage({ src, alt }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  const imageSrc = src;

  const handleZoom = useCallback((delta) => {
    setScale(prevScale => {
      const newScale = prevScale + delta * 0.1;
      return Math.min(Math.max(0.5, newScale), 3);
    });
  }, []);

  const handleWheel = useCallback((e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      handleZoom(delta);
    }
  }, [handleZoom]);

  const handleMouseDown = useCallback((e) => {
    if (isZoomed) {
      e.preventDefault();
      setIsDragging(true);
      setHasMoved(false);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  }, [isZoomed, position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setHasMoved(true);
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!hasMoved) {
      setIsZoomed(!isZoomed);
      if (!isZoomed) {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
    }
  }, [hasMoved, isZoomed]);

  const handleClose = useCallback((e) => {
    e.stopPropagation();
    setIsZoomed(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (isZoomed) {
      document.addEventListener('wheel', handleWheel, { passive: false });
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
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
            src={imageSrc}
            alt={alt}
            style={{
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px)) scale(${scale})`
            }}
            onMouseDown={handleMouseDown}
            draggable={false}
          />
          <div className={styles.zoomControls}>
            <button onClick={(e) => { e.stopPropagation(); handleZoom(1); }}>+</button>
            <button onClick={(e) => { e.stopPropagation(); handleZoom(-1); }}>-</button>
          </div>
        </div>
      )}
    </div>
  );
}
