import React from 'react';

import { imgConfig } from '../../config/imgConfig';
import uploadImg from '../../assets/cloud-upload-regular-240.png';
import styles from './DropFileInput.module.css';

interface IFile {
    onFileChange: (fileList: File[]) => void;
};

const DropFileInput = ({ onFileChange }: IFile) => {
  const [ fileList, setFileList ] = React.useState<File[]>([]);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  const onDragEnter = (): void => {
    if (wrapperRef.current) {
        wrapperRef.current.classList.add('dragover');
    }
  };

  const onDragLeave = (): void => {
    if (wrapperRef.current) {
        wrapperRef.current.classList.remove('dragover')
    }
  };

  const onDrop = (): void => {
    if (wrapperRef.current) {
        wrapperRef.current.classList.remove('dragover')
    }
  };

  const onFileDrop = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newFile: File | undefined = e.target.files?.[0];
    if (newFile) {
      const updatedList: File[] = [...fileList, newFile];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file: File): void => {
    const updatedList: File[] = [...fileList];
    const fileIndex: number = updatedList.indexOf(file);
    if (fileIndex !== -1) {
      updatedList.splice(fileIndex, 1);
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const formatFileSize = (fileSize: number): string => {
    const threshold = 1024; // 1KB = 1024 bytes;

    if (fileSize < threshold) {
      return `${fileSize}B`;
    } else if (fileSize < threshold * threshold) {
      const fileSizeInKB = Math.floor(fileSize / threshold);
      return `${fileSizeInKB}KB`;
    } else {
      const fileSizeInMB = (fileSize / (threshold * threshold)).toFixed(2);
      return `${fileSizeInMB}MB`;
    }
  };
  
  return (
    <>
      <div
        ref={wrapperRef}
        className={styles.drop_file_input}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className={styles.drop_file_input__label}>
          <img src={uploadImg} alt="" />
          <p>Drag & Drop your files here</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className={styles.drop_file_preview}>
          <p className={styles.drop_file_preview__title}>Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className={styles.drop_file_preview__item}>
              <img src={imgConfig[item.type.split('/')[1]] || imgConfig['default']} alt="" />
              <div className={styles.drop_file_preview__item__info}>
                <p>{item.name}</p>
                <p>{formatFileSize(item.size)}</p>
              </div>
              <span className={styles.drop_file_preview__item__del} onClick={() => fileRemove(item)}>
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default DropFileInput;