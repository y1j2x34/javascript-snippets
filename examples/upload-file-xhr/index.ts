export async function main() {
    const file = new Blob([new Uint8Array(10 * 1024 * 1024)]);

    const xhr = new XMLHttpRequest();
    const success = await new Promise(resolve => {
        xhr.upload.addEventListener('progress', event => {
            if (event.lengthComputable) {
                console.log('上传进度:', event.loaded / event.total);
            }
        });
        xhr.addEventListener('loadend', () => {
            resolve(xhr.readyState === 4 && xhr.status === 200);
        });
        xhr.open('PUT', 'https://httpbin.org/put', true);
        xhr.setRequestHeader('Content-Type', 'application/octet-stream');
        const formdata = new FormData();
        formdata.append('file', file);
        xhr.send(formdata);
    });
    console.log('success:', success);
}
