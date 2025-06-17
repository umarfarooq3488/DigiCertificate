import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";

const FONT_FAMILIES = [
  "Arial", "Roboto", "Lobster", "Great Vibes", "Times New Roman", "Georgia", "Courier New", "Verdana", "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS"
];

const PlaceholderEditor = ({ imageUrl, initialPos, onSave }) => {
  const [image] = useImage(imageUrl, "anonymous");
  const [namePos, setNamePos] = useState(initialPos || { x: 100, y: 100 });
  const [fontSize, setFontSize] = useState(initialPos?.fontSize || 24);
  const [color, setColor] = useState(initialPos?.color || "#ff0000");
  const [fontFamily, setFontFamily] = useState(initialPos?.fontFamily || "Arial");
  const textRef = useRef();
  const sampleText = "Name";
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.width());
    }
  }, [fontSize, fontFamily, sampleText]);

  return (
    <div className="w-full max-w-[600px] mx-auto bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col gap-6 items-center mt-4 overflow-x-auto">
      <h3 className="text-lg font-bold text-blue-700 mb-2">Set Name Placeholder Position</h3>
      <div className="overflow-auto rounded-lg border border-blue-200 bg-blue-50 flex justify-center items-center">
        <Stage width={600} height={400} className="block" style={{ background: "#f8fafc" }}>
          <Layer>
            <KonvaImage image={image} width={600} height={400} />
            <Text
              ref={textRef}
              text={sampleText}
              x={namePos.x}
              y={namePos.y}
              draggable
              fill={color}
              fontSize={fontSize}
              fontFamily={fontFamily}
              offsetX={textWidth / 2}
              onDragEnd={e => setNamePos({ x: e.target.x(), y: e.target.y() })}
            />
          </Layer>
        </Stage>
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-center w-full">
        <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          Font Size:
          <input
            type="range"
            min={12}
            max={72}
            value={fontSize}
            onChange={e => setFontSize(Number(e.target.value))}
            className="accent-blue-600"
          />
          <span className="w-10 text-center">{fontSize}px</span>
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          Color:
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
            className="w-8 h-8 p-0 border-0"
          />
        </label>
        <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
          Font Family:
          <select
            value={fontFamily}
            onChange={e => setFontFamily(e.target.value)}
            className="border rounded px-2 py-1 focus:ring-2 focus:ring-blue-300"
          >
            {FONT_FAMILIES.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </label>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg shadow transition"
          onClick={() => onSave({ ...namePos, fontSize, color, fontFamily, align: 'center' })}
        >
          Save Placeholder Position
        </button>
      </div>
    </div>
  );
};

export default PlaceholderEditor;
