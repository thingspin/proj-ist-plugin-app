import { Injectable } from '@angular/core';
import { HashLocationStrategy } from '@angular/common';

// Ref : https://stackoverflow.com/questions/40397273/angular2-app-base-href-with-hashlocationstrategy
@Injectable()
export class CustomLocationStrategy extends HashLocationStrategy {
    prepareExternalUrl(internal: string): string {
        return `${this.getBaseHref()}#${internal}`;
    }
}

const teTagBef = '<tr class="file-preview-frame {frameClass}" id="{previewId}" data-fileindex="{fileindex}"' +
' data-template="{template}"';
const teContent = '<td class="kv-file-content">\n';


export const defaultFileinputConf = {
    theme: "explorer",
    uploadUrl: "/",
    browseClass: "btn btn-success btn-block",
    browseLabel: 'Upload Model File(s)',
    showCaption: false,
    showRemove: false,
    showUpload: false,
    overwriteInitial: false,
    previewFileIcon: '<i class="fa fa-file-text-o text-info"></i>',
    initialPreviewAsData: true, // defaults markup
    preferIconicPreview: true, // this will force thumbnails to display icons for following file extensions
    previewFileIconSettings: { // configure your icon file extensions
        'doc': '<i class="fa fa-file-word-o text-primary"></i>',
        'xls': '<i class="fa fa-file-excel-o text-success"></i>',
        'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
        'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
        'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
        'htm': '<i class="fa fa-file-code-o text-info"></i>',
        'txt': '<i class="fa fa-file-text-o text-info"></i>',
        'mov': '<i class="fa fa-file-movie-o text-warning"></i>',
        'mp3': '<i class="fa fa-file-audio-o text-warning"></i>',
        // note for these file types below no extension determination logic
        // has been configured (the keys itself will be used as extensions)
        'jpg': '<i class="fa fa-file-photo-o text-danger"></i>',
        'gif': '<i class="fa fa-file-photo-o text-muted"></i>',
        'png': '<i class="fa fa-file-photo-o text-primary"></i>'
    },
    previewFileExtSettings: { // configure the logic for determining icon file extensions
        'doc': function(ext) { return ext.match(/(doc|docx)$/i); },
        'xls': function(ext) { return ext.match(/(xls|xlsx)$/i); },
        'ppt': function(ext) { return ext.match(/(ppt|pptx)$/i); },
        'zip': function(ext) { return ext.match(/(zip|rar|tar|gzip|gz|7z)$/i); },
        'htm': function(ext) { return ext.match(/(htm|html)$/i); },
        'txt': function(ext) { return ext.match(/(txt|ini|csv|java|php|js|css|meta|index|data)$/i); },
        'mov': function(ext) { return ext.match(/(avi|mpg|mkv|mov|mp4|3gp|webm|wmv)$/i); },
        'mp3': function(ext) { return ext.match(/(mp3|wav)$/i); }
    },
    layoutTemplates: {
        preview: '<div class="file-preview {class}">\n' +
        '    {close}' +
        '    <div class="{dropClass}">\n' +
        '    <table class="table table-bordered table-hover"><tbody class="file-preview-thumbnails">\n' +
        '    </tbody></table>\n' +
        '    <div class="clearfix"></div>' +
        '    <div class="file-preview-status text-center text-success"></div>\n' +
        '    <div class="kv-fileinput-error"></div>\n' +
        '    </div>\n' +
        '</div>',
        footer: '<td class="file-details-cell"><div class="explorer-caption" title="{caption}">{caption}</div> ' +
        '{size}{progress}</td><td class="file-actions-cell">{indicator} {actions}</td>',
        actions: '{drag}\n' +
        '<div class="file-actions">\n' +
        '    <div class="file-footer-buttons">\n' +
        '        {upload} {download} {delete} {zoom} {other} ' +
        '    </div>\n' +
        '</div>',
        zoomCache: '<tr style="display:none" class="kv-zoom-cache-theme"><td>' +
        '<table class="kv-zoom-cache">{zoomContent}</table></td></tr>',
        fileIcon: '<i class="fa fa-file kv-caption-icon"></i> '
    },
    previewMarkupTags: {
        tagBefore1: teTagBef + '>' + teContent,
        tagBefore2: teTagBef + ' title="{caption}">' + teContent,
        tagAfter: '</td>\n{footer}</tr>\n'
    },
    previewSettings: {
        image: {height: "60px"},
        html: {width: "100px", height: "60px"},
        text: {width: "100px", height: "60px"},
        video: {width: "auto", height: "60px"},
        audio: {width: "auto", height: "60px"},
        flash: {width: "100%", height: "60px"},
        object: {width: "100%", height: "60px"},
        pdf: {width: "100px", height: "60px"},
        other: {width: "100%", height: "60px"}
    },
    frameClass: 'explorer-frame',
    fileActionSettings: {
        showUpload: false,
        removeIcon: '<i class="fa fa-trash"></i>',
        uploadIcon: '<i class="fa fa-upload"></i>',
        uploadRetryIcon: '<i class="fa fa-repeat"></i>',
        downloadIcon: '<i class="fa fa-download"></i>',
        zoomIcon: '<i class="fa fa-search-plus"></i>',
        dragIcon: '<i class="fa fa-arrows"></i>',
        indicatorNew: '<i class="fa fa-plus-circle text-warning"></i>',
        indicatorSuccess: '<i class="fa fa-check-circle text-success"></i>',
        indicatorError: '<i class="fa fa-exclamation-circle text-danger"></i>',
        indicatorLoading: '<i class="fa fa-hourglass text-muted"></i>'
    },
    previewZoomButtonIcons: {
        prev: '<i class="fa fa-caret-left fa-lg"></i>',
        next: '<i class="fa fa-caret-right fa-lg"></i>',
        toggleheader: '<i class="fa fa-fw fa-arrows-v"></i>',
        fullscreen: '<i class="fa fa-fw fa-arrows-alt"></i>',
        borderless: '<i class="fa fa-fw fa-external-link"></i>',
        close: '<i class="fa fa-fw fa-remove"></i>'
    },
    browseIcon: '<i class="gicon gicon-add-variable"></i>',
    removeIcon: '<i class="fa fa-trash"></i>',
    cancelIcon: '<i class="fa fa-ban"></i>',
    uploadIcon: '<i class="fa fa-upload"></i>',
    msgValidationErrorIcon: '<i class="fa fa-exclamation-circle"></i> '
};

export const WIZARD_BASE_HREF = '/plugins/proj-edge-ai-app/page/wizard';
