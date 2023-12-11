import React, { useState, useEffect } from 'react';
import '../jquery-loader';
import '../jszip-loader';
import 'gridjs-spreadsheet/xspreadsheet.css';
import Spreadsheet from 'gridjs-spreadsheet';
import './XlFileViewer.css'

function XlFileViewer() {
  const [xlsData, setXlsData] = useState(null);
  const jsDataUrl = '/GridJs2/DetailFileJson?filename=test1.xlsx';

  const onHighlightClick = () => {};
  const onTextHighlightClick = () => {};
  const onInverseHighlightClick = () => {};
  const onCloseClick = () => {};
  const onHighlightWorksheetClick = () => {};
  const onHighlightWorkbookClick = () => {};
  const onTargetedHighlightClick = () => {};

  useEffect(() => {
    fetch(jsDataUrl)
      .then((resp) => {
        return resp.json();
      })
      .then((xlsJson) => {
        setXlsData(xlsJson);
      })
      .catch(err => {
        console.dir(err);
      });
  }, []);

  useEffect(() => {
    if (xlsData) {
      const xs = new Spreadsheet('#gridjs-demo', {
        showToolbar: false,
        mode: 'read',
        local: 'en',
        view: {
          height: () => {
            //default gridjs assumes it is filling entire viewport
            //override to fill the parent container
            return document.getElementById('gridjs-demo').clientHeight;
          },
        },
        showContextmenu: true,
        contextMenuItems: {
          usedefault: false,
          customItems: [
            { key: 'highlight', text: 'Highlight', callback: onHighlightClick },
            {
              key: 'highlightworksheet',
              text: 'Highlight Whole Worksheet',
              callback: onHighlightWorksheetClick,
            },
            {
              key: 'highlightworkbook',
              text: 'Highlight Whole Workbook',
              callback: onHighlightWorkbookClick,
            },
            { key: 'divider' },
            {
              key: 'targetedhighlight',
              text: 'Targeted Highlight',
              callback: onTargetedHighlightClick,
            },
            {
              key: 'texthighlight',
              text: 'Text Highlight',
              callback: onTextHighlightClick,
            },
            //{ 'key': 'divider' },
            {
              key: 'inverse',
              text: 'Inverse Highlight',
              callback: onInverseHighlightClick,
            },
            //{
            //    'key': 'inverseworksheet',
            //    'text': 'Inverse Worksheet Highlight',
            //    'callback': onInverseWorksheetClick
            //},
            //{
            //    'key': 'inverseworkbook',
            //    'text': 'Inverse Workbook Highlight',
            //    'callback': onInverseWorkbookClick
            //},
            //{ 'key': 'divider' },
            { key: 'close', text: 'Close', callback: onCloseClick },
          ],
        },
      })
        .loadData(xlsData.data) // load data
        .change((data) => {
          // save data to db
        });
        setTimeout(() => {
            // Set the active sheet and cell to start with in the GridJS Viewer
            xs.setActiveSheetByName(xlsData.actname).setActiveCell(
                xlsData.actrow,
                xlsData.actcol
            )
        });
    }
  }, [xlsData]);
  return <div id='gridjs-demo' data-testid='gridjs-demo'></div>;
}

export default XlFileViewer;
