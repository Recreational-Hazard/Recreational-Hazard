export function getFormData(
    event: Event | SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
): { [k: string]: FormDataEntryValue } {
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    return Object.fromEntries(form.entries());
}

export function nameToRgba(name: string) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.fillStyle = name;
    context.fillRect(0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data;
}

type ImageMimeType = 'image/bmp' | 'image/gif' | 'image/jpeg' | 'image/png' | 'image/tiff';
interface ImageConfigOptions {
    MAX_HEIGHT?: number,
    MAX_WIDTH?: number,
    MIME_TYPE?: ImageMimeType,
    quality?: number,
}

export function compressImage(
    file: File,
    callBack?: (imageData:string | ArrayBuffer) => void,
    config: ImageConfigOptions = {
        MAX_WIDTH: 800, MAX_HEIGHT: 800, MIME_TYPE: 'image/jpeg', quality: 0.8
    }) {

        if (document) {
        let ImageData:string;
        const blobUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobUrl;

        img.onerror = (e) => {
            URL.revokeObjectURL(img.src);
            console.error("Failed to load image", e);
        }

        img.onload = () => {
            URL.revokeObjectURL(img.src)
            const [newW, newH] = calculateSize(img, config.MAX_WIDTH, config.MAX_HEIGHT);
            const canvas = document.createElement('canvas');
            canvas.width = newW;
            canvas.height = newH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newW, newH);
            canvas.toBlob((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = () =>{
                    ImageData = reader.result.toString();
                    callBack(reader.result);
                }
            }, config.MIME_TYPE, config.quality)
        }
        return ImageData

    }
}


function calculateSize(img: HTMLImageElement, maxWidth: number, maxHeight: number) {
    let width = img.width;
    let height = img.height;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}