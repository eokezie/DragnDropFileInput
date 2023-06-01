import fileDefault from '../assets/file-blank-solid-240.png';
import fileCSS from '../assets/file-css-solid-240.png';
import filePDF from '../assets/file-pdf-solid-240.png';
import filePNG from '../assets/file-png-solid-240.png';

type TImgConfig = {
    [key: string]: string
}

export const imgConfig: TImgConfig = {
    default: fileDefault,
    pdf: filePDF,
    png: filePNG,
    css: fileCSS
}