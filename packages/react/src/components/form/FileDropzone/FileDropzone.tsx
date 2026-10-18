export type FileDropzoneProps = {
  disabled?: boolean;
  multiple?: boolean;
  accept?: string | string[];
};

export const FileDropzone: React.FC<FileDropzoneProps> = ({
  disabled,
  multiple,
  accept,
}) => {
  return (
    <label
      onDragOver={(event) => {
        const fileItems = [...event.dataTransfer.items].filter(
          (item) => item.kind === 'file',
        );
        if (fileItems.length > 0) {
          event.preventDefault();
          if (fileItems.some((item) => item.type.startsWith('image/'))) {
            event.dataTransfer.dropEffect = 'copy';
          } else {
            event.dataTransfer.dropEffect = 'none';
          }
        }
      }}
      onDrop={(event) => {
        if (
          [...event.dataTransfer.items].some((item) => item.kind === 'file')
        ) {
          event.preventDefault();
        }
      }}
    >
      <div>Drag and drop files here, or click to select files</div>
      <input
        hidden
        type="file"
        disabled={disabled}
        multiple={multiple}
        accept={Array.isArray(accept) ? accept.join(',') : accept}
      />
    </label>
  );
};

// window.addEventListener("dragover", (e) => {
//   const fileItems = [...e.dataTransfer.items].filter(
//     (item) => item.kind === "file",
//   );
//   if (fileItems.length > 0) {
//     e.preventDefault();
//     if (!dropZone.contains(e.target)) {
//       e.dataTransfer.dropEffect = "none";
//     }
//   }
// });
