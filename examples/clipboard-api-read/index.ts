export async function main() {
    const hasPermission = await requestForPermission();
    if (!hasPermission) {
        return;
    }
    const text = await navigator.clipboard.readText();
    console.log('从剪贴板读取的文本：', text);
    const clipboardItems = await navigator.clipboard.read();

    clipboardItems.forEach(item => {
        const blob = item.getType('image/png');
        console.log('从剪贴板读取到的图片：', blob);
    });
}

async function requestForPermission() {
    const queryOpts: PermissionDescriptor = {
        // @ts-ignore
        name: 'clipboard-read',
        allowWithoutGesture: true,
    };
    const { state } = await navigator.permissions.query(queryOpts);
    return state === 'granted';
}
