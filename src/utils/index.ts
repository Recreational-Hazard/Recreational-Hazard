export function getFormData(
    event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }
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
