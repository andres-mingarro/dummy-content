import styles from "./ImagePreview.module.scss";

interface ImagePreviewProps {
  src: string;
  width: number;
  height: number;
}

export default function ImagePreview({ src, width, height }: ImagePreviewProps) {
  return (
    <div className={`${styles.wrapper} ImagePreview`}>
      <div className={styles.canvas}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`Preview ${width}x${height}`}
          className={styles.image}
          style={{ aspectRatio: `${width} / ${height}` }}
        />
      </div>
      <p className={styles.dimensions}>
        {width} × {height} px
      </p>
    </div>
  );
}
