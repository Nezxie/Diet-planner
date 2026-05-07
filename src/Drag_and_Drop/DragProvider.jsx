import {createContext, useContext , useState, useRef} from 'react'
const DragContext = createContext(null);

export default function DragProvider({children, onDrop, renderDragPreview}){
    const [hoveredZone, setHoveredZone] = useState(null);

    const currentPointer = useRef({x:0,y:0})
    const pointerOffset = useRef({x:0,y:0})
    const dropZones = useRef([]);
    const overlayRef = useRef(null); //pointer to overlay to do overlay.style.transform = ...
    const activeDragRef = useRef(null);

 function registerDropZone(id, element) {
    if (!element) return;

    dropZones.current = [
        ...dropZones.current.filter(z => z.id !== id),
        { id, element }
    ];
  }

    function onDragStart(e, instanceId, item){
        e.currentTarget.setPointerCapture(e.pointerId);
        const bounds = e.currentTarget.getBoundingClientRect();
        pointerOffset.current = {
            x:e.clientX - bounds.left,
            y:e.clientY - bounds.top
        }
        currentPointer.current = {
            x:e.clientX - pointerOffset.current.x,
            y:e.clientY - pointerOffset.current.y
        }       
        activeDragRef.current = {instanceId,item};

    }

    function onDragMove(e){
        if(!activeDragRef.current) return;
        currentPointer.current = {
            x:e.clientX-pointerOffset.current.x,
            y:e.clientY-pointerOffset.current.y
        }

        if (overlayRef.current) {
            overlayRef.current.style.transform =
                `translate(${currentPointer.current.x}px, ${currentPointer.current.y}px)`;
            }
        const newHoveredZone = dropZones.current.find((zone)=>{
            const zoneBounds = zone.element.getBoundingClientRect();
            const pX = currentPointer.current.x;
            const pY = currentPointer.current.y;
            if(pX >= zoneBounds.left && pX <= zoneBounds.right && pY >= zoneBounds.top && pY <= zoneBounds.bottom){
                return true;
            }
        })
        setHoveredZone(newHoveredZone?.id||null);
    }

    function onDragEnd(e){
        if(activeDragRef.current && hoveredZone){
            onDrop?.(activeDragRef.current,hoveredZone);
        }
        activeDragRef.current = null;
        setHoveredZone(null);
    }


 return (
    <DragContext.Provider
      value={{
        activeDragRef,
        hoveredZone,
        overlayRef,
        registerDropZone,
        onDragStart,
        onDragMove,
        onDragEnd,
        renderDragPreview
      }}
    >
      {children}
      {activeDragRef.current && (
        <div
          ref={overlayRef}
          className="drag-overlay"
        >
         {renderDragPreview?.(activeDragRef.current.item)}
        </div>
      )}
    </DragContext.Provider>
  );
}




export function useDraggable(item, instanceId){
    const context = useContext(DragContext);
    if(!context)
    throw new Error("useDraggable must be used inside DragProvider");

    const isDragging = context.activeDragRef.current?.instanceId === instanceId;
    return {
        isDragging,
        listeners:
        {
            onPointerDown: (e) => context.onDragStart(e,instanceId, item),
            onPointerMove: context.onDragMove,
            onPointerUp: context.onDragEnd
        }
    }
}


export function useDropZone(id){
    const context = useContext(DragContext);
    if(!context)
    throw new Error("useDropZone must be used inside DragProvider");

    function ref(element) {
        context.registerDropZone(id, element);
    }

    return {
        ref,
        isOver: context.hoveredZone === id
    }
}