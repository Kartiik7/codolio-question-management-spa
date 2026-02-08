import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem({ id, children, className }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : "auto",
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className={className}>
      {/* We pass listeners and attributes to the drag handle, or the whole item if desired. 
          Here we assume the children will use them or we pass them down. 
          Actually, let's pass a render prop or just attach to a handle if passed? 
          For simplicity, let's expose handle props to children via cloneElement or Context? 
          Or better, just return the div with ref and style, and let children handle the rest? 
          
          Wait, usually we clone children to pass dragHandleProps. 
          But to keep it flexible, let's export a context or use a render prop.
          
          However, for this specific project, let's just wrap the content. 
          We'll provide a DragHandle component or similar pattern.
      */}
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            dragHandleProps: { ...attributes, ...listeners },
            isDragging
          });
        }
        return child;
      })}
    </div>
  );
}
