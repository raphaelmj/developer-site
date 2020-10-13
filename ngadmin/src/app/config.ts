export const API_URL = 'http://localhost:3000'
export const CK_EDITOR_CONFIG = {
  allowedContent: true,
  extraPlugins: 'font,justify,sourcedialog',
  toolbar: [
    { name: 'clipboard', items: ['Source', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo'] },
    { name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'] },
    { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat'] },
    { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language'] },
    { name: 'links', items: ['Link', 'Unlink'] },
    { name: 'styles', items: ['Styles', 'Format', 'FontSize'] },
    { name: 'colors', items: ['TextColor'] },
    { name: 'tools', items: ['Maximize', 'ShowBlocks'] },
  ]
};
