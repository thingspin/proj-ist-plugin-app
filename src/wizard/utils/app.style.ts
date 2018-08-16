export const styleUrls = [
    'public/plugins/proj-edge-ai-app/css/bootstrap.min.css',
    'public/plugins/proj-edge-ai-app/css/style.css',
    'public/plugins/proj-edge-ai-app/css/loading-bars.css',
    'public/plugins/proj-edge-ai-app/css/riliwan-rabo.css',
    'public/plugins/proj-edge-ai-app/css/form.css',
    'public/plugins/proj-edge-ai-app/css/font-mfizz.css',
];

export function getStyleUrls(): string [] {
    let theme: string = ((<any>window).thingspinBootData.user.lightTheme) ? 'light' : 'dark';
    let csss: string[] = styleUrls;

    let prefix = 'public/plugins/proj-edge-ai-app/css/';

    csss.push(prefix + 'riliwan-rabo.' + theme + '.css');

    return csss;
}
