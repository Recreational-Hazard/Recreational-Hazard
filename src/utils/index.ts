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

export function compressImage(
    file: File, {
        MAX_WIDTH = 600, MAX_HEIGHT = 600, MIME_TYPE = 'image/png', quality = 0.7, output = "string"
    },
    callBack?: (imageData: string | Blob) => void,
) {

    if (document) {
        let ImageData: Blob | string;
        const blobUrl = URL.createObjectURL(file);
        const img = new Image();
        img.src = blobUrl;

        img.onerror = (e) => {
            URL.revokeObjectURL(img.src);
            console.error("Failed to load image", e);
        }

        img.onload = () => {
            URL.revokeObjectURL(img.src)
            const [newW, newH] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
            const canvas = document.createElement('canvas');
            canvas.width = newW;
            canvas.height = newH;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, newW, newH);

            canvas.toBlob(blob => {
                if (output === "blob") {
                    ImageData = blob;
                    console.log(blob.type, newW, newH,)
                    callBack(ImageData.size < file.size ? ImageData : file);
                }
                else {
                    const reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = () => {
                        ImageData = reader.result.toString();
                        callBack(blob.size < file.size ? reader.result.toString() : toBase64(file));
                    }
                }

            }, MIME_TYPE, quality)
        }
        return ImageData

    }
}

function toBase64 (file:File) {
    let base64:string;
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onerror = (error) => {
        console.log(error);
        throw new Error("Error occured");
        return
    }

    reader.onload = () => base64 = reader.result.toString();
    return base64;

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