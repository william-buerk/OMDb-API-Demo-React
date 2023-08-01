import {useEffect, useState} from "react";
import "./ImageModal.scss";
import {clamp} from "../../utils/utils";
import useResizeObserver from "@react-hook/resize-observer";
import useForceUpdate from "../../utils/useForceUpdate";


type ImageModalProps = {
    src: string;
    closeClicked: () => void;
}

export default function ImageModal({src, closeClicked}: ImageModalProps) {

    const [mousePos, setMousePos] = useState({x: 0, y: 0});
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
          setMousePos({ x: event.clientX, y: event.clientY });
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
          window.removeEventListener(
            'mousemove',
            handleMouseMove
          );
        };
      }, []);

      useResizeObserver(document.querySelector("body"), entry => {
        forceUpdate();
      });

    const getHoverPosition = () => {
        const preview = document.querySelector(".image-modal__preview");
        const hover = document.querySelector(".image-modal__preview-hover");

        if (!preview || !hover) {
            return {
                x: 0,
                y: 0
            }
        }

        const previewBoundingRect = preview.getBoundingClientRect();
        const hoverBoundingRect = hover.getBoundingClientRect();

        const previewX = previewBoundingRect.x;
        const previewY = previewBoundingRect.y;
        const hoverWidth = hoverBoundingRect.width;
        const hoverHeight = hoverBoundingRect.height;

        const rightBound = previewBoundingRect.right - previewX - hoverWidth;
        const bottomBound = previewBoundingRect.bottom - previewY - hoverHeight;

        return {
            x: clamp(mousePos.x - previewX - hoverWidth/2, 0, rightBound),
            y: clamp(mousePos.y - previewY - hoverHeight/2, 0, bottomBound),
        }

    }

    const getZoomPosition = () => {
        const preview = document.querySelector(".image-modal__preview");
        const hover = document.querySelector(".image-modal__preview-hover");

        if (!preview || !hover) {
            return {
                width: 0,
                height: 0
            }
        }

        const previewBoundingRect = preview.getBoundingClientRect();
        const hoverBoundingRect = hover.getBoundingClientRect();

        const hoverWidth = hoverBoundingRect.width;
        const hoverHeight = hoverBoundingRect.height;
        const previewWidth = previewBoundingRect.width;
        const previewHeight = previewBoundingRect.height;

        const scaleFactorWidth = previewWidth / hoverWidth;
        const scaleFactorHeight = previewHeight / hoverHeight;

        const previewX = previewBoundingRect.x;
        const previewY = previewBoundingRect.y;
        const hoverX = hoverBoundingRect.x;
        const hoverY = hoverBoundingRect.y;

        return {
            containerWidth: previewWidth,
            containerHeight: previewHeight,
            width: previewWidth * scaleFactorWidth,
            height: previewHeight * scaleFactorHeight,
            x: -(hoverX - previewX) * scaleFactorWidth,
            y: -(hoverY - previewY) * scaleFactorHeight
        }
    }

    return (
        <div className="image-modal">
            <button className="image-modal__close-button" onClick={closeClicked}>
                <p className="visually-hidden">Click to close</p>
            </button>
            <div className="image-modal__preview-container">
                <img className="image-modal__preview" src={src}/>
                <div className="image-modal__preview-hover" style={{
                        position: "fixed",
                        left: `${getHoverPosition().x}px`,
                        top: `${getHoverPosition().y}px`,
                    }}></div>
            </div>
            <div className="image-modal__zoom-container" style={{
                    position: "fixed",
                    width: `${getZoomPosition().containerWidth}px`,
                    height: `${getZoomPosition().containerHeight}px`,
                }}>
                <img className="image-modal__zoom" src={src} style={{
                    position:"fixed",
                    width: `${getZoomPosition().width}px`,
                    height: `${getZoomPosition().height}px`,
                    top: `${getZoomPosition().y}px`,
                    left: `${getZoomPosition().x}px`
                }}/>
            </div>
        </div>
    );
}