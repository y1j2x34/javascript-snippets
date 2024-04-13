export async function main() {
    const file = new Blob([new Uint8Array(10 * 1024 * 1024)], {
        type: 'application/octet-stream',
    });
    const totalBytes = file.size;
    let uploadedBytes = 0;

    const progressTrackingStream = new TransformStream({
        transform(chunk: Uint8Array, controller: TransformStreamDefaultController<Uint8Array>) {
            controller.enqueue(chunk);
            uploadedBytes += chunk.byteLength;
            console.log('上传进度: ', uploadedBytes / totalBytes);
        },
        flush() {
            console.log('上传完成');
        },
    });
    const response = await fetch('https://httpbin.org/put', {
        method: 'PUT',
        body: file.stream().pipeThrough(progressTrackingStream),
        // @ts-ignore
        duplex: 'half',
    });
    await response.blob();
}
